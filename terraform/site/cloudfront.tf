data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# The route-rewrite function and the security headers are checked into
# deployment/ and asserted by `npm run verify:production`. Terraform reads
# those same files so there is one source of truth rather than two copies
# that can drift apart.
resource "aws_cloudfront_function" "routes" {
  name    = "${var.project_name}-routes"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrites known SPA routes to their prerendered index.html"
  publish = true
  code    = file("${path.module}/../../deployment/cloudfront-function.js")
}

locals {
  headers_policy   = jsondecode(file("${path.module}/../../deployment/cloudfront-response-headers-policy.json")).ResponseHeadersPolicyConfig
  security_headers = local.headers_policy.SecurityHeadersConfig
}

resource "aws_cloudfront_response_headers_policy" "site" {
  name    = local.headers_policy.Name
  comment = local.headers_policy.Comment

  security_headers_config {
    content_security_policy {
      content_security_policy = local.security_headers.ContentSecurityPolicy.ContentSecurityPolicy
      override                = local.security_headers.ContentSecurityPolicy.Override
    }

    content_type_options {
      override = local.security_headers.ContentTypeOptions.Override
    }

    frame_options {
      frame_option = local.security_headers.FrameOptions.FrameOption
      override     = local.security_headers.FrameOptions.Override
    }

    referrer_policy {
      referrer_policy = local.security_headers.ReferrerPolicy.ReferrerPolicy
      override        = local.security_headers.ReferrerPolicy.Override
    }

    strict_transport_security {
      access_control_max_age_sec = local.security_headers.StrictTransportSecurity.AccessControlMaxAgeSec
      include_subdomains         = local.security_headers.StrictTransportSecurity.IncludeSubdomains
      preload                    = local.security_headers.StrictTransportSecurity.Preload
      override                   = local.security_headers.StrictTransportSecurity.Override
    }

    xss_protection {
      protection = local.security_headers.XSSProtection.Protection
      override   = local.security_headers.XSSProtection.Override
    }
  }

  custom_headers_config {
    dynamic "items" {
      for_each = local.headers_policy.CustomHeadersConfig.Items
      content {
        header   = items.value.Header
        value    = items.value.Value
        override = items.value.Override
      }
    }
  }
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = [var.site_domain]
  price_class         = var.price_class
  comment             = "${var.project_name} (${var.site_domain})"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "site-s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "site-s3-origin"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # CachingOptimized honors the Cache-Control headers the deploy workflow
    # sets per object, so hashed assets stay immutable and HTML stays no-cache.
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.site.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.routes.arn
    }
  }

  # Unlike a catch-all SPA, unknown paths must stay genuinely missing: serve
  # the prerendered 404 document but keep the HTTP 404 status, so search
  # engines never see a soft 404. S3 returns 403 for a missing object when the
  # bucket policy grants only GetObject, so both codes map to the same page.
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
