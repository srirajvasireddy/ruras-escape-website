import type { LegalSection } from './types'
import { siteConfig } from '../../config/site'

export const privacySections: LegalSection[] = [
  {
    id: 'scope-controller',
    title: '1. Scope And Who We Are',
    body: [
      "This Privacy Policy applies to the Rura’s Escape mobile game (the “Game”) and the official Rura’s Escape website (together, the “Services”). Sriraj Vasireddy, the independent developer and publisher of Rura’s Escape, is responsible for the privacy practices described here.",
      'The Game does not currently require an account or offer cloud saves. Most gameplay information remains only on your device. Some information is transmitted to service providers when analytics is enabled, when you choose to watch a rewarded advertisement, when you make a purchase, or when you contact support.',
    ],
  },
  {
    id: 'information-collected',
    title: '2. Information We Collect',
    body: [
      'We collect or process only the information reasonably needed to operate, improve, secure, and support the Services. The categories below distinguish information stored locally from information transmitted off the device.',
    ],
    bullets: [
      'On-device game data: level progress, stars, best moves, hints used, Daily Puzzle and challenge progress, settings, Rura Coin and hint balances, owned puzzle packs and cosmetics, equipped styles, themes, trails and celebrations, reward ledgers, and ad-frequency counters.',
      'Usage analytics, when enabled: a random app-scoped installation identifier; app launches and sessions; screens visited; puzzle starts, moves, completions, restarts, undo and hint use; rewards, virtual-currency activity, purchases and rewarded-ad events; feature and settings interactions; and error or performance events.',
      'Device and app context attached to analytics: app version, platform and operating-system version, device model where available, screen dimensions and pixel ratio, locale, time zone, performance tier, and reduced-motion preference.',
      'Advertising information: after the advertising SDK is permitted to initialize and when you request a rewarded ad, Google Mobile Ads may process IP address and approximate location inferred from it, app and device identifiers (including an advertising identifier where available and permitted), ad interactions, diagnostics, and fraud-prevention signals.',
      'Purchase information: Google Play processes payment credentials. The Game may receive a product identifier, localized price, purchase token, order or transaction identifier, purchase state, and acknowledgement status so it can grant and reconcile Rura Coins. We do not receive your full payment-card details.',
      'Support information: if you contact us, we receive the information you choose to provide, such as your email address, message, screenshots, device details, and purchase information needed to investigate the request.',
      'Website usage analytics: the website uses Google Analytics 4 to measure how the site is used. It records page views, clicks on links and buttons, outbound and email-contact clicks, how far pages are scrolled, which sections are reached, playable-demo interactions such as moves, hints, restarts and completions, and script errors, together with the referring page, approximate location derived from IP address, device, browser and language. Google Analytics stores first-party cookies (names beginning “_ga”) that hold a randomly generated identifier for the browser. Advertising storage, advertising personalization and Google signals are disabled for the website, and we do not use website analytics to build advertising profiles.',
      'Website request data: hosting and security providers may automatically process ordinary request information such as IP address, browser type, requested page, timestamp, and diagnostic logs to deliver and protect the site.',
    ],
  },
  {
    id: 'how-we-use',
    title: '3. How And Why We Use Information',
    body: [
      'We use information to provide gameplay and save local progress; grant purchases and rewards; deliver ads only when requested; remember settings; measure reliability and puzzle balance; diagnose crashes and errors; prevent fraud or abuse; answer support requests; comply with legal obligations; and protect our rights and users.',
      'For people in the European Economic Area, United Kingdom, or Switzerland, our legal bases are performance of a contract for requested game and purchase functionality; legitimate interests in operating, securing, supporting, and improving the Services; consent where required for analytics, advertising identifiers, advertising-related storage, or other advertising processing; and compliance with law. You may withdraw consent at any time without affecting processing that occurred before withdrawal.',
    ],
  },
  {
    id: 'local-storage',
    title: '4. Information That Stays On Your Device',
    body: [
      'Game progress, settings, balances, entitlements, cosmetic selections, challenge state, and internal transaction ledgers are stored in the Game’s local application storage. They are not cloud-synced by Rura’s Escape. Resetting Campaign progress does not reset purchases or the reward ledger; clearing the app’s storage or uninstalling may permanently remove locally stored progress and inventory.',
      'Because there is no Rura’s Escape account, we generally cannot restore local progress after it is erased or moved to another device.',
    ],
  },
  {
    id: 'analytics',
    title: '5. Analytics And Diagnostics',
    body: [
      'Production builds can use Google Analytics for Firebase to receive the usage and device-context events described above. Analytics is off by default for every new installation and after any Terms or Privacy version that requires a renewed choice. Firebase collection remains disabled unless you expressly select the optional analytics choice during the first-run agreement or later turn on “Share usage analytics” in Profile. Turning it off stops future delivery and clears queued events waiting to be sent by the Game.',
      'When analytics is enabled, Firebase may process an app-instance identifier, IP-derived country or general location, and device or app information under Google’s terms. The Game also uses a pseudonymous random, app-scoped installation identifier for analytics. It is not an advertising identifier or account ID, and we do not use it to identify you by name.',
      'The website is measured separately with Google Analytics 4 (measurement ID G-BEMVN1TNEH). It is used to understand which pages and sections people read, which calls to action they use, and where the playable demo helps or frustrates. Google acts as our processor for this measurement, and the identifiers it sets are pseudonymous browser identifiers rather than names or account IDs. You can prevent website analytics by installing the Google Analytics opt-out browser add-on, by blocking analytics cookies or scripts in your browser or an extension, or by browsing with those cookies cleared.',
    ],
    links: [
      { label: 'Firebase privacy and security', href: 'https://firebase.google.com/support/privacy' },
      { label: 'Google Analytics opt-out browser add-on', href: 'https://tools.google.com/dlpage/gaoptout' },
      { label: 'How Google uses data from sites that use its services', href: 'https://policies.google.com/technologies/partner-sites' },
      { label: 'Google Privacy Policy', href: 'https://policies.google.com/privacy' },
    ],
  },
  {
    id: 'advertising-consent',
    title: '6. Rewarded Ads And Privacy Choices',
    body: [
      'The Game offers optional rewarded video ads through Google AdMob. It does not use banner, interstitial, rewarded-interstitial, or app-open ads. Choosing not to watch an ad does not block the free Campaign, Chill paths, or Daily Puzzle. A reward is granted only after the ad provider confirms completion.',
      'After you accept the Terms and before initializing ads, the Game asks Google’s User Messaging Platform whether a privacy message is required and displays Google’s form when applicable. If that consent flow fails, ads remain disabled for the session. Rura’s Escape requests contextual, non-personalized ads for every player. Where required, Profile includes “Ad privacy options” so you can review or withdraw advertising choices. For the planned iOS release in 2027, the Game is expected to request App Tracking Transparency authorization when applicable; declining tracking will not prevent limited ads where lawful.',
      'Google and its advertising partners may act as independent controllers for some advertising processing. Even though the Game requests non-personalized ads, identifiers, ad measurement, fraud-prevention, or other advertising processing may be considered “sharing” or targeted-advertising activity under some laws. We do not sell personal information for money. Use the in-game Ad privacy options and your device’s advertising controls to limit this processing.',
    ],
    links: [
      { label: 'How Google uses partner app data', href: 'https://policies.google.com/technologies/partner-sites' },
      { label: 'Google advertising controls', href: 'https://myadcenter.google.com/' },
    ],
  },
  {
    id: 'purchases',
    title: '7. Purchases',
    body: [
      'Rura Coin packs are the Game’s only real-money products. Google Play processes the transaction and payment credentials under its own terms and privacy policy. The Game uses purchase confirmation data to credit the correct coin pack once, recover eligible completed transactions, prevent duplicate grants, provide support, and satisfy accounting or legal obligations.',
      'Items bought with Rura Coins—including hints, character styles, trails, board themes, celebrations, and puzzle packs—are recorded locally. They are deterministic purchases; the Game does not sell randomized loot boxes.',
    ],
    links: [
      { label: 'Google Play privacy information', href: 'https://policies.google.com/privacy' },
    ],
  },
  {
    id: 'sharing',
    title: '8. When We Disclose Information',
    body: [
      'We disclose information only as described in this policy: to Google Analytics for Firebase for expressly opted-in measurement in the Game; to Google Analytics 4 for website measurement; to Google AdMob and User Messaging Platform for requested ads and consent choices; to Google Play for distribution and purchases; to website hosting and security providers; to professional advisers or vendors bound to use information for authorized purposes; or when reasonably necessary to comply with law, enforce our terms, protect users, investigate fraud, or complete a business transfer.',
      'We do not rent personal information or maintain a data-broker business. We do not disclose support correspondence publicly unless you ask us to or we remove identifying details and have another lawful basis.',
    ],
  },
  {
    id: 'retention',
    title: '9. Retention And Deletion',
    body: [
      'Local game data remains until you reset the applicable feature, clear the Game’s data, or uninstall it. Queued analytics events are deleted when you opt out. Event-level analytics data under our control is retained for no longer than 14 months; aggregated or de-identified reports may be kept longer because they no longer reasonably identify an app installation.',
      'Support correspondence is generally retained for up to 24 months after the matter closes. Purchase and accounting records may be retained for up to seven years, or longer when law, fraud prevention, chargeback handling, or an active dispute requires it. Google services retain information under their own policies and configured controls.',
      'When retention ends, information is deleted, de-identified, or allowed to expire. Backups and provider systems may take additional time to cycle out deleted information.',
    ],
  },
  {
    id: 'security',
    title: '10. Security',
    body: [
      'We use reasonable administrative and technical safeguards appropriate to the Services, including limiting collected data, keeping most progress on-device, using store billing rather than collecting card details, and relying on encrypted transport for Google SDK data. No device, storage system, or transmission method is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'children',
    title: "11. Children's Privacy",
    body: [
      'Rura’s Escape is a general-audience game intended primarily for teens and adults and is not directed to children under 13. Its neutral first-run age range prevents an under-13 selection from continuing. A 13–17 selection requires confirmation that a parent or legal guardian reviewed and agreed to the Terms. The selected range stays in local app storage and is used to apply a more protective advertising age signal. We do not knowingly request a child’s name, contact information, or account registration. If you are under 13, do not use the Services or send us personal information.',
      'If we learn that we collected personal information from a child under 13 without legally valid authorization, we will take reasonable steps to delete it. A parent or guardian who believes this occurred should contact us through the Support page. We will reassess these practices if the intended audience, marketing, data collection, or store classification changes.',
    ],
  },
  {
    id: 'rights',
    title: '12. Your Rights And Choices',
    body: [
      'Depending on where you live, you may have rights to know or access personal information, obtain a portable copy, correct it, request deletion, restrict or object to processing, withdraw consent, opt out of sale or sharing and targeted advertising, and appeal a denied request. You will not be discriminated against for exercising a privacy right.',
      'You can disable usage analytics in Profile, manage advertising consent through Ad privacy options when shown, reset or delete local data through the Game or device settings, and use operating-system advertising controls. For the website, you can opt out of Google Analytics with Google’s opt-out browser add-on or by blocking analytics cookies in your browser. To make another request, use the Support page and state that it is a privacy request. We may need to verify the request. Because the Game has no account and analytics identifiers are pseudonymous, we may be unable to locate server-side information without sufficient technical identifiers.',
      'Authorized agents may submit requests where permitted by law. You may also complain to your local data-protection authority. California residents may use the same contact route for rights under the CCPA if that law applies to our processing. The website performs no advertising and requests no advertising storage or personalization from Google Analytics, so there is no website sale/share opt-out signal to apply; we will honor legally required browser signals if that changes.',
    ],
  },
  {
    id: 'international',
    title: '13. International Processing',
    body: [
      'The Services and their providers may process information in the United States and other countries where privacy laws differ from those where you live. Where required, providers use recognized transfer safeguards, such as adequacy decisions or contractual protections. Mandatory rights available in your home jurisdiction remain unaffected.',
    ],
  },
  {
    id: 'changes',
    title: '14. Changes To This Policy',
    body: [
      'We may update this policy when the Services, providers, or law change. We will post the revised policy here and update the “Last updated” date. If a change materially affects how personal information is used, we will provide additional notice or seek consent when required. We encourage you to review this page periodically.',
    ],
  },
  {
    id: 'contact',
    title: '15. Contact Us',
    body: [
      `${siteConfig.publisher} is the individual developer, publisher, and privacy contact responsible for the Services. Privacy requests and questions may be sent to ${siteConfig.privacyEmail} or mailed to ${siteConfig.businessMailingAddress}.`,
    ],
  },
]
