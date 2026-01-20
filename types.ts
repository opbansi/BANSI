
export type DealType = 'Trending' | 'Flash Sale' | 'All';
export type Genre = 'Action' | 'RPG' | 'Indie' | 'Horror' | 'Adventure' | 'All';

export interface Game {
  id: string;
  title: string;
  category: DealType;
  genre: Genre;
  imageUrl: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  description: string;
  stock: number;
  requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  mediaUrl?: string;
  timestamp: number;
  seen: boolean;
}

export interface User {
  id: string;
  username: string;
  number: string;
  password?: string;
  email: string;
  ip?: string;
  isAdmin?: boolean;
  status: 'online' | 'offline';
  lastSeen?: number;
  signupDate?: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bio?: string;
  profilePic?: string;
}

export interface PurchaseLog {
  id: string;
  userId: string;
  username: string;
  gameTitle: string;
  timestamp: number;
  price: number;
}

export interface CartItem extends Game {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
}

export interface GameRecommendation {
  suggestedTitles: string[];
  reasoning: string;
  matchingGenre: string;
  vibeDescription: string;
  estimatedPriceRange: string;
}

export interface DecorSuggestion {
  theme: string;
  vibe: string;
  colorPalette: string[];
  lighting: string;
  furniture: string[];
  accessories: string[];
}
