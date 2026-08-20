// CloudFront viewer-request function. Associate this with the default behavior.
// Known SPA routes are rewritten to their metadata-specific static documents;
// assets and unknown paths are left alone so S3/CloudFront can return a real 404.
function handler(event) {
  var request = event.request;
  var routes = {
    '/': '/index.html',
    '/privacy-policy': '/privacy-policy/index.html',
    '/privacy-policy/': '/privacy-policy/index.html',
    '/terms': '/terms/index.html',
    '/terms/': '/terms/index.html',
    '/support': '/support/index.html',
    '/support/': '/support/index.html'
  };
  if (routes[request.uri]) request.uri = routes[request.uri];
  return request;
}

