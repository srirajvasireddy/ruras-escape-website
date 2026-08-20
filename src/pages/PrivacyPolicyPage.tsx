import { LegalPageLayout } from '../components/layout/LegalPageLayout'
import { siteConfig } from '../config/site'
import { privacySections } from '../data/legal/privacy'
import { useSeo } from '../hooks/useSeo'

export function PrivacyPolicyPage() {
  useSeo({
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `How ${siteConfig.name} handles player information, analytics, advertising and privacy choices.`,
    path: '/privacy-policy',
  })

  return (
    <LegalPageLayout
      title="Privacy Policy"
      intro={`This policy explains what ${siteConfig.name} and this website collect, what stays only on your device, how Google services are used, and the choices available to you.`}
      effectiveDate={siteConfig.legal.privacyEffectiveDate}
      lastUpdated={siteConfig.legal.privacyLastUpdated}
      sections={privacySections}
    />
  )
}
