import type { LegalSection } from './types'
import { siteConfig } from '../../config/site'

export const termsSections: LegalSection[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance And Eligibility',
    body: [
      'These Terms of Use (the “Terms”) are an agreement between you and Sriraj Vasireddy, the independent developer and publisher of Rura’s Escape (“we,” “us,” or “our”). They govern the Rura’s Escape mobile game, its content and features (the “Game”), and the official Rura’s Escape website (together, the “Services”). Before the Game enables play, billing, or advertising services, it presents links to these Terms and the Privacy Policy and requires you to select “Agree & continue.” By making that selection or by accessing or using the website, you agree to these Terms. The Privacy Policy explains our information practices and choices; optional analytics consent is requested separately and is not required to play.',
      'If you do not agree, do not use the Services. You must be at least 13 years old and legally able to enter this agreement. If you are under the age of legal majority where you live, a parent or legal guardian must review and agree to these Terms and supervise your use. The Services are not directed to children under 13.',
    ],
  },
  {
    id: 'license',
    title: '2. Limited Licence',
    body: [
      'Subject to these Terms, we grant you a limited, revocable, non-exclusive, non-transferable, non-sublicensable licence to install and use one authorized copy of the Game on devices you own or control, solely for personal, non-commercial entertainment and as permitted by the applicable app store rules. The Services are licensed, not sold.',
      'No rights are granted except those expressly stated. We and our licensors retain all right, title, and interest in the Services, including software, artwork, characters, animation, audio, level data and designs, text, trade dress, and branding.',
    ],
  },
  {
    id: 'gameplay',
    title: '3. Gameplay, Progress And Local Saves',
    body: [
      'The Game currently uses local device storage for progress, settings, virtual balances, entitlements, rewards, and cosmetic selections. It does not currently provide a Rura’s Escape account or cloud save. You are responsible for maintaining access to your device and its app data. Uninstalling, clearing storage, device failure, or unsupported transfer methods may permanently erase progress or locally recorded items.',
      'We may rebalance puzzles, rewards, challenges, prices in Rura Coins, availability, difficulty, or other gameplay systems to maintain the Game. Stars, best moves, rewards, Daily Puzzles, challenges, and availability may depend on the current Game version and local device time. We do not promise that every puzzle, reward, or feature will remain unchanged or continuously available.',
    ],
  },
  {
    id: 'virtual-items',
    title: '4. Rura Coins And Virtual Items',
    body: [
      'Rura Coins, hints, character styles, trails, board themes, celebrations, puzzle packs, rewards, and other digital items are limited, personal licences to use digital content inside the Game. They are not money, stored value, property, or a financial instrument; have no cash value; cannot be redeemed for cash; and may not be sold, traded, gifted, transferred, or used outside Rura’s Escape.',
      'You do not own a property interest in virtual balances or items. We may manage, regulate, modify, or discontinue virtual items when reasonably necessary for the Game, legal compliance, security, or service operations. We will not intentionally remove paid content without a legitimate reason, and mandatory consumer remedies remain available where applicable.',
      'Coin-priced items are disclosed before confirmation and are deterministic. Rura’s Escape does not sell randomized loot boxes. A virtual-item selection is final once delivered except where the Game, Google Play policy, or applicable law provides otherwise.',
    ],
  },
  {
    id: 'purchases',
    title: '5. Purchases And Pricing',
    body: [
      'Rura Coin packs are the Game’s only real-money products. Purchases made in the Android version are processed through Google Play Billing under the Google Play terms applicable to your account and region. The price and currency displayed in the Google Play purchase interface control. Taxes, currency conversion, family-payment settings, and payment authorization are handled by Google or your payment provider.',
      'You authorize the applicable store to charge the selected payment method. A purchase is delivered only after the store reports a completed transaction. Pending, cancelled, declined, reversed, or unverified transactions do not require us to grant content. We may delay or reverse a grant reasonably linked to a refund, chargeback, fraud, duplicate credit, or unauthorized transaction. Keep purchase receipts when requesting support.',
      'You are responsible for securing your device, store account, authentication controls, and payment method, including purchases made by a child or another person using your credentials, except where applicable law provides otherwise.',
    ],
  },
  {
    id: 'refunds',
    title: '6. Refunds',
    body: [
      'Refund eligibility and processing generally follow Google Play’s refund rules and applicable law. Google may handle requests made through its systems, and we may be able to investigate or process eligible developer-side requests using the order information you provide. A refund or charge reversal may remove the related virtual currency or content. Nothing in these Terms limits a non-waivable right to a refund, cancellation, conformity remedy, or statutory cooling-off right.',
    ],
    links: [
      { label: 'Google Play refund policies', href: 'https://support.google.com/googleplay/answer/15574908' },
    ],
  },
  {
    id: 'advertising',
    title: '7. Optional Rewarded Advertising',
    body: [
      'The Game may offer optional rewarded video ads. There are no banner, forced interstitial, rewarded-interstitial, or app-open ads in the current release. Ad availability, content, and successful completion are controlled partly by Google AdMob and advertisers and are not guaranteed. The advertised reward is granted only after the ad provider confirms completion. Closing, skipping, losing connectivity, reaching a reward cap, or a provider error may result in no reward.',
      'Advertisements are third-party content. We do not endorse an advertiser or guarantee its products, claims, availability, or destination. Advertising and consent choices are described in the Privacy Policy and can be managed through the Game where required.',
    ],
  },
  {
    id: 'acceptable-use',
    title: '8. Acceptable Use',
    body: [
      'You may not, and may not help others to:',
    ],
    bullets: [
      'Copy, reproduce, distribute, publicly perform, sell, rent, sublicense, or commercially exploit the Services or their assets except as expressly authorized in writing.',
      'Reverse engineer, decompile, disassemble, derive source code from, bypass technical controls in, or create unauthorized derivative works of the Services, except to the limited extent a restriction is prohibited by applicable law.',
      'Cheat, automate play, manipulate local storage or device time to obtain unauthorized rewards, duplicate transactions, falsify purchases, exploit bugs, or use modified clients.',
      'Interfere with security, availability, billing, analytics, advertising, consent, or other service systems; introduce malware; probe for vulnerabilities; or access information or systems without authorization.',
      'Use the Services unlawfully, infringe another person’s rights, misrepresent affiliation with us, or use Rura’s Escape branding to deceive others.',
    ],
  },
  {
    id: 'intellectual-property',
    title: '9. Intellectual Property And Feedback',
    body: [
      'Rura’s Escape, Rura, the logos, original visual presentation, level content, text, and other proprietary elements are protected by intellectual-property and unfair-competition laws. Third-party components remain subject to their respective licences and notices. No use of our names, characters, logos, store art, or game assets is permitted in a way that suggests sponsorship, affiliation, or endorsement.',
      'If you voluntarily send suggestions or feedback, you grant us a worldwide, perpetual, irrevocable, royalty-free, transferable and sublicensable licence to use, adapt, commercialize, and otherwise exploit that feedback without compensation or attribution. This does not transfer ownership of personal information included in feedback; the Privacy Policy still applies.',
    ],
  },
  {
    id: 'third-parties',
    title: '10. Third-Party Services',
    body: [
      'The Services may depend on Google Play, Firebase Analytics, AdMob, User Messaging Platform, device operating systems, hosting providers, and open-source software. Those services may have separate terms and privacy practices. We are not responsible for third-party services we do not control, but this does not exclude responsibility that applicable law places on us for selecting or integrating providers.',
      'Open-source licence notices are available inside the Game. Google Play and its logo are trademarks of Google LLC; their appearance does not imply sponsorship of Rura’s Escape.',
    ],
  },
  {
    id: 'availability',
    title: '11. Updates, Availability And Discontinuation',
    body: [
      'We may add, update, remove, suspend, or discontinue content or features; require an update for compatibility or security; correct errors; or stop supporting devices or operating-system versions. The Services may be interrupted by maintenance, provider outages, network conditions, legal requirements, or events outside our reasonable control.',
      'If the Game is discontinued, local functionality may continue only to the extent technically possible. Ad delivery, purchases, support, downloads, updates, and provider-backed features may stop. Where applicable law requires a remedy for paid digital content, that right is preserved.',
    ],
  },
  {
    id: 'termination',
    title: '12. Suspension And Termination',
    body: [
      'You may stop using the Services at any time. We may suspend or terminate the licence granted by these Terms if you materially or repeatedly violate them, threaten the Services or others, engage in fraud, or if continued access would create legal or security risk. Where practical and appropriate, we may provide notice or an opportunity to cure. On termination, you must stop using the Services, but provisions that by their nature should survive will remain effective.',
    ],
  },
  {
    id: 'disclaimers',
    title: '13. Disclaimers',
    body: [
      'Nothing in these Terms excludes warranties, guarantees, or remedies that cannot lawfully be excluded. Subject to that sentence, the Services are provided “as is” and “as available.” To the fullest extent permitted by law, we disclaim implied warranties of merchantability, fitness for a particular purpose, satisfactory quality, quiet enjoyment, non-infringement, accuracy, and uninterrupted or error-free operation. We do not warrant that local progress will never be lost, that every device will remain compatible, or that ads, purchases, rewards, and third-party services will always be available.',
    ],
  },
  {
    id: 'liability',
    title: '14. Limitation Of Liability',
    body: [
      'Nothing in these Terms limits liability for fraud, fraudulent misrepresentation, willful misconduct, gross negligence, death or personal injury caused by negligence, breach of non-waivable consumer rights, or any liability that applicable law does not allow to be limited.',
      'Subject to that carve-out, to the fullest extent permitted by law, we will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages; loss of data, progress, virtual items, opportunity, revenue, or goodwill; or third-party conduct arising from the Services, even if the possibility was known. Our aggregate liability for all claims relating to the Services will not exceed the greater of the amount you paid for Rura’s Escape purchases during the twelve months before the event giving rise to the claim or US $50. Some jurisdictions do not allow certain exclusions or limitations, so they apply only to the extent lawful.',
    ],
  },
  {
    id: 'applicable-law',
    title: '15. Applicable Law And Disputes',
    body: [
      'These Terms do not require arbitration, waive class-action rights, or select a court or governing law that would deprive you of mandatory consumer protections. The law and courts applicable to a dispute will be determined under ordinary conflict-of-law, jurisdiction, and consumer-protection rules. Before filing a claim, we encourage you to contact us through Support and allow a reasonable opportunity to resolve the issue informally, unless urgent relief or a filing deadline makes that impractical.',
    ],
  },
  {
    id: 'changes',
    title: '16. Changes To These Terms',
    body: [
      'We may update these Terms to reflect changes to the Services, providers, law, or risk. The revised version will be posted here with a new “Last updated” date. If a material change requires notice or renewed agreement, we will provide it as required. Changes do not retroactively reduce rights already accrued under mandatory law. Continuing to use the Services after an effective update constitutes acceptance to the extent permitted by law.',
    ],
  },
  {
    id: 'general',
    title: '17. General',
    body: [
      'These Terms and the Privacy Policy form the entire agreement about the Services, except for applicable store terms. If a provision is unlawful or unenforceable, it will be enforced to the maximum lawful extent and the remainder will continue. Our failure to enforce a provision is not a waiver. You may not assign these Terms without our consent; we may assign them in connection with a reorganization, transfer, or sale of the Services, subject to applicable law. Headings are for convenience only.',
    ],
  },
  {
    id: 'contact',
    title: '18. Publisher And Contact',
    body: [
      `Rura’s Escape is published by ${siteConfig.publisher} in his individual capacity, not by a corporation or limited-liability company. Notices and questions may be emailed to ${siteConfig.supportEmail} or mailed to ${siteConfig.businessMailingAddress}.`,
    ],
  },
]
