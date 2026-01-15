
import { Event, EventType, Meal, FAQCategory, StaffContact, ExplorePlace, Restaurant } from '../types';

const today = new Date().toISOString().split('T')[0];

export const MOCK_EVENTS: Event[] = [
  { id: '1', date: today, title_ko: '오리엔테이션', title_en: 'Orientation', type: EventType.OT, time: '09:00', location: 'Main Hall' },
  { id: '2', date: today, title_ko: '숙소 청소 서비스', title_en: 'Dorm Cleaning Service', type: EventType.CLEANING, time: '10:00', location: 'Dorm Block A' },
  { id: '3', date: '2025-05-20', title_ko: '졸업식', title_en: 'Graduation Ceremony', type: EventType.GRADUATION, time: '14:00', location: 'Auditorium' },
  { id: '4', date: today, title_ko: '입소', title_en: 'Arrival', type: EventType.ARRIVAL, time: '14:00', location: 'Gate 1' },
];

export const MOCK_MEALS: Meal[] = [
  { id: 'm1', date: today, meal: 'LUNCH', order: 1, menu_ko: '비빔밥', menu_en: 'Bibimbap', spicy: true, seafood: false, peanut: false, wheat: false },
  { id: 'm2', date: today, meal: 'LUNCH', order: 2, menu_ko: '미역국', menu_en: 'Seaweed Soup', spicy: false, seafood: true, peanut: false, wheat: false },
  { id: 'm3', date: today, meal: 'DINNER', order: 1, menu_ko: '불고기', menu_en: 'Bulgogi', spicy: false, seafood: false, peanut: false, wheat: true },
];

export const MOCK_FAQ: FAQCategory[] = [
  {
    id: 'cat1',
    name_ko: '음식',
    name_en: 'Food',
    items: [
      { id: 'faq1', question: '식단 알러지 정보는 어디서 보나요?', answer: '홈 화면이나 Meal Plan 메뉴에서 메뉴 이름 옆의 아이콘을 확인하세요. 🌶=매움, 🐟=해산물, 🥜=땅콩, 🌾=밀' }
    ]
  },
  {
    id: 'cat2',
    name_ko: '택배',
    name_en: 'Parcel',
    items: [
      { id: 'faq2', question: '택배는 어디서 받나요?', answer: '사무실 옆 택배 보관함에서 수령 가능합니다.' }
    ]
  }
];

export const MOCK_STAFF: StaffContact[] = [
  { id: 's1', name: '김철수', role: 'Dormitory Manager', phone: '010-1234-5678', email: 'kim@gimhall.org' },
  { id: 's2', name: '이영희', role: 'Administration', phone: '010-9876-5432', email: 'lee@gimhall.org' },
];

export const MOCK_ATTRACTIONS: ExplorePlace[] = [
  { id: 'a1', name_ko: '강화도', name_en: 'Ganghwa Island', description: '역사적인 유적지와 아름다운 해변이 있는 섬입니다.', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=400', mapUrl: '#' },
  { id: 'a2', name_ko: '애기봉', name_en: 'Aegibong', description: '북한을 조망할 수 있는 평화 전망대가 있습니다.', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400', mapUrl: '#' },
  { id: 'a3', name_ko: '라베니체', name_en: 'Laveniche', description: '베네치아 스타일의 수변 상가로 야경이 아름답습니다.', imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=400', mapUrl: '#' },
  { id: 'a4', name_ko: '김포한강공원', name_en: 'Gimpo Hangang Park', description: '산책과 자전거 타기에 좋은 넓은 공원입니다.', imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400', mapUrl: '#' },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  { id: 'r1', name: '가마솥 국밥', description: '깊은 맛의 전통 소고기 국밥', category: 'Korean', priceLevel: 1 },
  { id: 'r2', name: '통진 갈비', description: '직접 구워주는 숯불 돼지갈비', category: 'BBQ', priceLevel: 2 },
  { id: 'r3', name: '카페 옹달샘', description: '회관 근처 조용한 분위기의 카페', category: 'Cafe', priceLevel: 1 },
  { id: 'r4', name: '만다린', description: '현지인들이 추천하는 짜장면 맛집', category: 'Chinese', priceLevel: 1 },
  { id: 'r5', name: '스테이크 하우스', description: '특별한 날 가기 좋은 양식당', category: 'Western', priceLevel: 3 },
];
