
import { Game } from './types';

const defaultRequirements = {
  os: "Windows 10/11 64-bit",
  processor: "Intel Core i7-8700 or AMD Ryzen 5 3600",
  memory: "16 GB RAM",
  graphics: "NVIDIA RTX 2060 or AMD RX 5700",
  storage: "100 GB available space"
};

/**
 * INITIAL_GAMES with official titles. 
 * imageUrl is set to a placeholder string to trigger the automatic RAWG sync in App.tsx
 */
export const INITIAL_GAMES: Game[] = [
  {
    id: '1',
    title: 'God of War (2018)',
    category: 'Trending',
    genre: 'Action',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 12,
    description: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters.",
    requirements: defaultRequirements
  },
  {
    id: '2',
    title: 'Grand Theft Auto V: Premium Edition',
    category: 'Flash Sale',
    genre: 'Action',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 29.99,
    discountPrice: 1,
    discountPercentage: 97,
    stock: 45,
    description: "The Grand Theft Auto V: Premium Edition includes the complete story experience and access to the ever-evolving Grand Theft Auto Online.",
    requirements: defaultRequirements
  },
  {
    id: '3',
    title: 'Cyberpunk 2077: Ultimate Edition',
    category: 'Trending',
    genre: 'RPG',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 1.5,
    discountPercentage: 98,
    stock: 8,
    description: "An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary.",
    requirements: defaultRequirements
  },
  {
    id: '4',
    title: "Marvel's Spider-Man 2",
    category: 'Trending',
    genre: 'Action',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 69.99,
    discountPrice: 2.1,
    discountPercentage: 97,
    stock: 15,
    description: "The Spider-Men, Peter Parker and Miles Morales, enter new chapters in their lives as they balance their responsibilities as protectors of New York City.",
    requirements: defaultRequirements
  },
  {
    id: '5',
    title: 'Red Dead Redemption 2',
    category: 'Trending',
    genre: 'Adventure',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2.1,
    discountPercentage: 97,
    stock: 5,
    description: "Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents on their heels, they must rob and steal to survive.",
    requirements: defaultRequirements
  },
  {
    id: '6',
    title: 'The Last of Us Part I',
    category: 'Flash Sale',
    genre: 'Horror',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 22,
    description: "In a ravaged civilization, where infected and hardened survivors run wild, Joel is hired to smuggle 14-year-old Ellie.",
    requirements: defaultRequirements
  },
  {
    id: '7',
    title: 'Black Myth: Wukong',
    category: 'Trending',
    genre: 'Action',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 9,
    description: "An action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges ahead.",
    requirements: defaultRequirements
  },
  {
    id: '8',
    title: 'Hogwarts Legacy',
    category: 'Trending',
    genre: 'RPG',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 31,
    description: "Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret.",
    requirements: defaultRequirements
  },
  {
    id: '9',
    title: 'The Last of Us Part II Remastered',
    category: 'Trending',
    genre: 'Horror',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 11,
    description: "Five years after their dangerous journey across the post-pandemic US, Ellie and Joel have settled down in Jackson, Wyoming.",
    requirements: defaultRequirements
  },
  {
    id: '10',
    title: 'God of War Ragnarök',
    category: 'Trending',
    genre: 'Action',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 69.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 7,
    description: "Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers.",
    requirements: defaultRequirements
  },
  {
    id: '11',
    title: 'Detroit: Become Human',
    category: 'Trending',
    genre: 'Indie',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 39.99,
    discountPrice: 2,
    discountPercentage: 95,
    stock: 14,
    description: "How far will you go to be free? Detroit: Become Human puts the destiny of both mankind and androids in your hands.",
    requirements: defaultRequirements
  },
  {
    id: '12',
    title: "Ghost of Tsushima DIRECTOR'S CUT",
    category: 'Trending',
    genre: 'Action',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 3,
    description: "Forge a new path and wage an unconventional war for the freedom of Tsushima.",
    requirements: defaultRequirements
  },
  {
    id: '13',
    title: "Marvel's Spider-Man Remastered",
    category: 'Trending',
    genre: 'Action',
    imageUrl: 'sync_required_placeholder',
    originalPrice: 59.99,
    discountPrice: 2,
    discountPercentage: 97,
    stock: 18,
    description: "In Marvel's Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original action-packed story.",
    requirements: defaultRequirements
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Neon Vanguard Command',
    style: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    description: 'A high-performance gaming setup with reactive ambient lighting.'
  }
];
