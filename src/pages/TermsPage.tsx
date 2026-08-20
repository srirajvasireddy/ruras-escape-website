import { LegalPageLayout } from '../components/layout/LegalPageLayout'
import { siteConfig } from '../config/site'
import { termsSections } from '../data/legal/terms'
import { useSeo } from '../hooks/useSeo'

export function TermsPage() {
  useSeo({
    title: `Terms of Use | ${siteConfig.name}`,
    description: `Terms governing use of ${siteConfig.name}, virtual items, purchases, rewarded ads and this website.`,
    path: '/terms',
  })

  return (
    <LegalPageLayout
      title="Terms of Use"
      intro={`These terms govern playing ${siteConfig.name} and using this website, including virtual items, Google Play purchases, optional rewarded ads, and acceptable use.`}
      effectiveDate={siteConfig.legal.termsEffectiveDate}
      lastUpdated={siteConfig.legal.termsLastUpdated}
      sections={termsSections}
    />
  )
}
