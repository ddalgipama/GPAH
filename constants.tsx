
import React from 'react';
import { 
  Home, Info, Bed, Utensils, Calendar as CalendarIcon, 
  GraduationCap, MessageCircle, Map, Phone, 
  Truck, Scissors, Camera, Waves, Brush, Sparkles,
  Search, ShieldAlert, AlertTriangle, Menu, X, ChevronLeft, ChevronRight, Lock, Bell
} from 'lucide-react';
import { EventType } from './types';

export const MENU_ITEMS = [
  { id: 'hall', label: '김포대회회관 소개', sub: 'Gimpo Assembly Hall', icon: <Info size={24} />, path: '#/hall' },
  { id: 'dorm', label: '숙소 관리 & 서비스', sub: 'Dormitory Services', icon: <Bed size={24} />, path: '#/dorm' },
  { id: 'meal', label: 'Meal Plan', sub: '식단표', icon: <Utensils size={24} />, path: '#/meal' },
  { id: 'calendar', label: 'Calendar', sub: '학사 일정', icon: <CalendarIcon size={24} />, path: '#/calendar' },
  { id: 'graduation', label: 'Graduation', sub: '졸업 정보', icon: <GraduationCap size={24} />, path: '#/graduation' },
  { id: 'faq', label: 'FAQ', sub: '자주 묻는 질문', icon: <MessageCircle size={24} />, path: '#/faq' },
  { id: 'explore', label: '김포 이야기', sub: 'Explore Gimpo', icon: <Map size={24} />, path: '#/explore' },
  { id: 'contact', label: 'Contact Us', sub: '연락처 & 문의', icon: <Phone size={24} />, path: '#/contact' },
];

export const EVENT_ICONS: Record<EventType, React.ReactNode> = {
  [EventType.ARRIVAL]: <span className="text-xl">🧳</span>,
  [EventType.OT]: <span className="text-xl">🎤</span>,
  [EventType.CLEANING]: <span className="text-xl">🧹</span>,
  [EventType.LAUNDRY]: <span className="text-xl">🧺</span>,
  [EventType.SALON]: <span className="text-xl">💇‍♂️</span>,
  [EventType.SHOE]: <span className="text-xl">👞</span>,
  [EventType.PHOTO]: <span className="text-xl">📸</span>,
  [EventType.GRADUATION]: <span className="text-xl">🎓</span>,
};

export const DORM_CATEGORIES = [
  { id: 'cleaning', label: '청소', sub: 'Cleaning', icon: <Sparkles size={28} className="text-blue-500" /> },
  { id: 'laundry', label: '세탁', sub: 'Laundry', icon: <Waves size={28} className="text-cyan-500" /> },
  { id: 'salon', label: '미용', sub: 'Salon', icon: <Scissors size={28} className="text-rose-400" /> },
  { id: 'shoe', label: '구두', sub: 'Shoe Care', icon: <Brush size={28} className="text-amber-700" /> },
  { id: 'photo', label: '사진촬영', sub: 'Photo Service', icon: <Camera size={28} className="text-indigo-500" /> },
  { id: 'dry', label: '드라이클리닝', sub: 'Dry Cleaning', icon: <Truck size={28} className="text-slate-500" /> },
];

export const MY_MAPS_URL = "https://www.google.com/maps/d/u/0/viewer?mid=1Q0j9S8G6p-qI_oX7r-tG-Xm_2W-J1S_8";
