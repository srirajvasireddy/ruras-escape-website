/** Support FAQ content. Edit here rather than in JSX. */

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'platforms',
    question: 'Which devices can I play on?',
    answer:
      "Rura’s Escape is a mobile puzzle game for Android. It is playable on phones and tablets running a supported version of Android.",
  },
  {
    id: 'offline',
    question: 'Do I need an internet connection?',
    answer:
      'Puzzles are played on your device. A connection is needed for some features, such as loading rewarded ads to earn Rura Coins.',
  },
  {
    id: 'progress',
    question: 'Where is my progress stored?',
    answer:
      'Progress, unlocked cosmetics and Rura Coins are stored locally on your device. Uninstalling the game, clearing its data or switching to a new device can remove that progress.',
  },
  {
    id: 'coins',
    question: 'How do Rura Coins work?',
    answer:
      'Rura Coins are the in-game currency used to unlock cosmetic items such as outfits, trails and board themes. You can earn coins by playing, and you can also choose to watch a rewarded ad to earn more.',
  },
  {
    id: 'hints',
    question: 'What do hints do?',
    answer:
      "Hints help you make progress when a level has you stuck. They're entirely optional — every puzzle is designed to be solvable without them.",
  },
  {
    id: 'ads',
    question: 'A rewarded ad did not give me my coins. What now?',
    answer:
      'Rewarded ads need to finish playing before the reward is granted, and a weak connection can interrupt them. Try again on a stable connection, and if the reward still does not arrive, get in touch with the details listed above.',
  },
  {
    id: 'purchase',
    question: 'I have a question about a purchase or a refund.',
    answer:
      'Purchases are processed by Google Play, not directly by the game. Billing questions, payment method issues and refund requests are handled through Google Play under its policies, so those are best raised there first.',
  },
  {
    id: 'children',
    question: 'Is the game suitable for children?',
    answer:
      "Rura’s Escape is designed to be family-friendly, with no violence and no chat features. The Google Play listing carries the game’s official content rating.",
  },
  {
    id: 'bug',
    question: 'How do I report a bug?',
    answer:
      'Send us the device model, the Android version, the level or screen where it happened, and what you expected to happen instead. A screenshot or short recording makes it far quicker to track down.',
  },
]
