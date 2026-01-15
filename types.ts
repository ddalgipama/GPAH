
export enum EventType {
  ARRIVAL = 'ARRIVAL',
  OT = 'OT',
  CLEANING = 'CLEANING',
  LAUNDRY = 'LAUNDRY',
  SALON = 'SALON',
  SHOE = 'SHOE',
  PHOTO = 'PHOTO',
  GRADUATION = 'GRADUATION'
}

export interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title_ko: string;
  title_en?: string;
  type: EventType;
  time?: string;
  location?: string;
  description_ko?: string;
  description_en?: string;
}

export interface Meal {
  id: string;
  date: string; // YYYY-MM-DD
  meal: 'LUNCH' | 'DINNER';
  order: number;
  menu_ko: string;
  menu_en?: string;
  spicy: boolean;
  seafood: boolean;
  peanut: boolean;
  wheat: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name_ko: string;
  name_en: string;
  items: FAQ[];
}

export interface StaffContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Notice {
  message: string;
  active: boolean;
  updatedAt: string;
}

export interface HotelSurvey {
  id: string;
  roomNumber: string;
  name: string;
  guests: number;
  roomsNeeded?: number;
  roomType?: '2인 1실' | '더블룸' | '트윈룸';
  notes?: string;
  type: 'PRELIMINARY' | 'FINAL';
  submittedAt: string;
}

export interface ExplorePlace {
  id: string;
  name_ko: string;
  name_en: string;
  description: string;
  imageUrl: string;
  mapUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: string;
  priceLevel: number; // 1-3
}

export interface ContactSubmission {
  id: string;
  roomNumber: string;
  name: string;
  category: 'Room issue' | 'Facility issue' | 'Noise/Cleanliness' | 'Suggestion' | 'Other';
  title: string;
  description: string;
  email?: string;
  replyMethods: string[];
  photos: string[];
  status: 'pending' | 'resolved';
  createdAt: string;
}
