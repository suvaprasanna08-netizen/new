/**
 * A Little Universe for Vasilisa
 * Central Configuration & Customization File
 *
 * All greetings, messages, letter text, gift contents,
 * and aesthetic settings can be easily customized here.
 */

export interface GiftItem {
  id: number;
  title: string;
  subtitle: string;
  boxColor: string;
  ribbonColor: string;
  accentColor: string;
  pattern: 'stripes' | 'dots' | 'stars' | 'floral';
  isLocked?: boolean;
  messageTitle: string;
  messageBody: string;
  quote?: string;
}

export interface GardenSecret {
  id: string;
  name: string;
  type: 'flower' | 'lantern' | 'star' | 'butterfly';
  title: string;
  message: string;
}

export interface GalleryPanel {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  accentColor: string;
  quote: string;
  illustrationType: 'constellation' | 'botanical' | 'horizon' | 'lanterns';
}

export const BIRTHDAY_CONFIG = {
  // Recipient details
  recipient: {
    name: 'Vasilisa',
    nameCyrillic: 'Василиса',
    birthdayDate: 'October 13',
    shortGreetingEn: 'Happy Birthday, Vasilisa!',
    shortGreetingRu: 'С днём рождения, Василиса!',
    subheadingEn: 'Today, this little universe celebrates YOU.',
  },

  // Scene 1: Welcome text
  welcome: {
    kicker: 'A SPECIAL CELEBRATION',
    introText: 'Somewhere in this little universe, a special celebration is waiting for you.',
    ctaButton: 'Open Your Surprise',
    hintText: 'Click the envelope or button to begin',
  },

  // Scene 2: Reveal messages
  reveal: {
    headline: 'Happy Birthday, Vasilisa!',
    cyrillicHeadline: 'С днём рождения, Василиса!',
    subheading: 'Today, this little universe celebrates YOU.',
    dateBadge: '13 · OCTOBER',
    exploreButton: 'Explore Your Birthday World',
    reflection: 'Every star in this sky is glowing a little brighter today, honoring your presence, your laughter, and the wonderful warmth you bring to everyone around you.',
  },

  // Scene 3: The Enchanted Garden secrets
  garden: {
    title: 'The Enchanted Garden',
    subtitle: 'Touch the glowing lanterns, blooming roses, and wishing stars to uncover hidden birthday wishes.',
    secrets: [
      {
        id: 'lantern-1',
        name: 'The Lantern of Joy',
        type: 'lantern',
        title: 'A Wish for Endless Joy',
        message: 'May every morning greet you with peaceful thoughts, gentle sunshine, and unexpected reasons to smile throughout your day.',
      },
      {
        id: 'lantern-2',
        name: 'The Lantern of Adventures',
        type: 'lantern',
        title: 'A Wish for New Horizons',
        message: 'May this year open doors to exciting journeys, breathtaking views, and memorable stories waiting to be lived.',
      },
      {
        id: 'lantern-3',
        name: 'The Lantern of Serenity',
        type: 'lantern',
        title: 'A Wish for Inner Peace',
        message: 'May your heart always find calm amidst the rush of the world, surrounded by quiet warmth, cozy tea, and genuine comfort.',
      },
      {
        id: 'star-1',
        name: 'The North Star',
        type: 'star',
        title: 'A Playful Cosmic Note',
        message: 'Astronomers confirm: on October 13, the constellation of Vasilisa radiates 100% extra charm and brilliance across the cosmos!',
      },
      {
        id: 'star-2',
        name: 'The Wishing Star',
        type: 'star',
        title: 'A Secret Star Blessing',
        message: 'Whatever quiet wish you whispered into the wind recently—may the universe work softly behind the scenes to grant it.',
      },
      {
        id: 'flower-rose',
        name: 'Velvet Rose',
        type: 'flower',
        title: 'Beauty in Bloom',
        message: 'Like petals unfolding under morning dew, may your unique talents and dreams blossom effortlessly this year.',
      },
      {
        id: 'flower-tulip',
        name: 'Golden Tulip',
        type: 'flower',
        title: 'Fresh Beginnings',
        message: 'Here is to fresh chapters, sweet memories, and the quiet beauty of ordinary days turned extraordinary.',
      },
    ] as GardenSecret[],
  },

  // Scene 4: Birthday Cake details
  cake: {
    title: 'The Birthday Cake Ceremony',
    subtitle: 'Light the candles, make a heartfelt wish, and celebrate another wonderful chapter of your life.',
    wishPrompt: 'Close your eyes, think of something you truly desire this year, and press "Make a Wish"...',
    wishConfirmed: 'Your wish has been woven into the stars of this universe. May it find its way back to you in the most beautiful way!',
    candlesCount: 5,
  },

  // Scene 5: The Gift Room presents
  gifts: [
    {
      id: 1,
      title: 'A Sweet Surprise',
      subtitle: 'Tied with a dusty rose silk ribbon',
      boxColor: '#FFF0F5',
      ribbonColor: '#F472B6',
      accentColor: '#DB2777',
      pattern: 'floral',
      isLocked: false,
      messageTitle: 'A Sweet Birthday Wish',
      messageBody:
        'May your day be filled with little moments that make you smile, unexpected happiness, and all the beautiful things you deserve.',
      quote: '“Joy is not in things; it is in us.”',
    },
    {
      id: 2,
      title: 'The Playful Surprise',
      subtitle: 'Wrapped in lavender paper with golden twine',
      boxColor: '#F3E8FF',
      ribbonColor: '#A855F7',
      accentColor: '#7E22CE',
      pattern: 'dots',
      isLocked: false,
      messageTitle: 'Cosmic Birthday Decree!',
      messageBody:
        'Official Universal Announcement: Birthday cake calories do not count today! May your upcoming year have 365 days of zero unnecessary stress, phenomenal coffee, delicious treats, and countless hilarious moments that make you laugh until your stomach hurts.',
      quote: '“Growing older is mandatory, but growing dull is strictly forbidden!”',
    },
    {
      id: 3,
      title: 'The Friendship Surprise',
      subtitle: 'Champagne gold box with ivory satin bow',
      boxColor: '#FEF9C3',
      ribbonColor: '#EAB308',
      accentColor: '#CA8A04',
      pattern: 'stripes',
      isLocked: false,
      messageTitle: 'Bridges Across Continents',
      messageBody:
        'Even when thousands of kilometers and different time zones lie between countries, true friendship remains as effortless and close as ever. Thank you for being such a wonderful, uplifting, and genuine person. No matter where life carries us, know that I am always rooting for you and celebrating your happiness.',
      quote: '“Distance means so little when a friend means so much.”',
    },
    {
      id: 4,
      title: 'The Secret Surprise',
      subtitle: 'Midnight velvet chest with golden filigree seal',
      boxColor: '#1E1B4B',
      ribbonColor: '#FBBF24',
      accentColor: '#F59E0B',
      pattern: 'stars',
      isLocked: true,
      messageTitle: 'A Whispered Truth',
      messageBody:
        'The most precious secret in this universe is simple: your presence makes the world significantly softer, brighter, and kinder. You bring a rare grace and laughter to the lives of those fortunate enough to know you. Keep shining exactly as you are!',
      quote: '“You are a rare constellation in a quiet sky.”',
    },
  ] as GiftItem[],

  // Scene 6: The Heartfelt Letter
  // (Easily editable here in one clear location)
  letter: {
    salutation: 'Dear Vasilisa,',
    closing: 'With lots of friendship and birthday wishes,',
    signature: 'Your Friend',
    dateLabel: 'October 13',
    paragraphs: [
      'Happy Birthday!',
      'I hope this new year of your life brings you countless reasons to smile, beautiful surprises, peaceful days, exciting adventures, and people who make you feel appreciated.',
      "Even though we're in different countries, I'm really glad our paths crossed and that we became friends.",
      'I hope today reminds you how special it is to have people in your life who are happy you exist.',
      'Keep being yourself, keep laughing at the little things, and never stop looking forward to the beautiful moments still waiting for you.',
      'May your birthday be full of happiness, your favourite little things, unexpected surprises, and memories that make you smile long after the day is over.',
      'And remember: somewhere in another part of the world, a friend is wishing you the happiest birthday.',
      'Happy Birthday, Vasilisa!',
    ],
  },

  // Scene 7: The Dreamy Celebration Gallery
  gallery: [
    {
      id: 1,
      title: 'Little Things Worth Celebrating',
      subtitle: 'The Quiet Magic of Ordinary Days',
      description:
        'The gentle aroma of morning coffee, the golden autumn sunlight filtering through a window, a song that makes you dance in your room, and conversations that leave you smiling.',
      themeColor: '#FDF2F8',
      accentColor: '#EC4899',
      quote: 'Collect beautiful moments like pressed flowers in a favorite book.',
      illustrationType: 'botanical',
    },
    {
      id: 2,
      title: 'A World Full of Possibilities',
      subtitle: 'Journeys Waiting on the Horizon',
      description:
        'New cities yet to be explored, unread books waiting on quiet shelves, winding mountain paths, and sudden adventures that turn into lifelong cherished stories.',
      themeColor: '#EFF6FF',
      accentColor: '#3B82F6',
      quote: 'The horizon belongs to those who look at tomorrow with gentle courage.',
      illustrationType: 'horizon',
    },
    {
      id: 3,
      title: 'More Reasons to Smile',
      subtitle: 'Laughter, Serendipity & Good Fortune',
      description:
        'Those unexpected coincidences where everything falls into place, funny shared jokes that need no explanation, and the comfort of having people who understand your silence.',
      themeColor: '#FEF3C7',
      accentColor: '#D97706',
      quote: 'A single genuine laugh has enough power to brighten an entire week.',
      illustrationType: 'lanterns',
    },
    {
      id: 4,
      title: 'Beautiful Things Ahead',
      subtitle: 'Your Constellation in the Coming Year',
      description:
        'Triumphs both small and mighty, peaceful evenings where your heart is fully at rest, and the quiet assurance that the best chapters of your journey are still being written.',
      themeColor: '#F5F3FF',
      accentColor: '#8B5CF6',
      quote: 'May this year be as generous, graceful, and radiant as your own spirit.',
      illustrationType: 'constellation',
    },
  ] as GalleryPanel[],

  // Scene 8: The Grand Finale
  finale: {
    heading: 'Happy Birthday, Vasilisa!',
    cyrillicHeading: 'С днём рождения, Василиса!',
    message:
      'I hope the year ahead brings you beautiful surprises, wonderful adventures, countless reasons to smile, and happiness in all the little moments.',
    dateSubtext: 'October 13 · A Celebration Beyond Borders',
    replayFinaleBtn: 'Replay Finale Fireworks',
    returnWorldBtn: 'Return to Celebration',
    restartJourneyBtn: 'Begin from Chapter 1',
  },

  // Audio configuration
  audio: {
    // Optional external audio file URL. If left empty, or if network fails,
    // the app uses its built-in Web Audio procedural music box synthesizer!
    customAudioUrl: '',
    autoPlayPrompt: 'Play Birthday Melody',
    synthBpm: 68,
  },
};
