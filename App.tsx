
import React, { useState, useEffect } from 'react';
import { Event, Meal, FAQCategory, StaffContact, Notice, ExplorePlace, Restaurant } from './types';
import { MOCK_EVENTS, MOCK_MEALS, MOCK_FAQ, MOCK_STAFF, MOCK_ATTRACTIONS, MOCK_RESTAURANTS } from './data/mockData';
import Layout from './components/Layout';
import Home from './pages/Home';
import MealPlan from './pages/MealPlan';
import DormitoryServices from './pages/DormitoryServices';
import FAQ from './pages/FAQ';
import Graduation from './pages/Graduation';
import GimpoHall from './pages/GimpoHall';
import Calendar from './pages/Calendar';
import ExploreGimpo from './pages/ExploreGimpo';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import { Settings as SettingsIcon } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<string>(window.location.hash.replace('#/', '') || 'home');
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [meals, setMeals] = useState<Meal[]>(MOCK_MEALS);
  const [faq, setFaq] = useState<FAQCategory[]>(MOCK_FAQ);
  const [staff, setStaff] = useState<StaffContact[]>(MOCK_STAFF);
  const [places, setPlaces] = useState<ExplorePlace[]>(MOCK_ATTRACTIONS);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS);
  
  // App Global Settings
  const [notice, setNotice] = useState<Notice>(() => {
    const saved = localStorage.getItem('gimpo_notice');
    return saved ? JSON.parse(saved) : { 
      message: '오늘 저녁 식사 시간이 30분 앞당겨졌습니다. (Dinner starts 30m early today)', 
      active: true, 
      updatedAt: new Date().toISOString() 
    };
  });

  const [headerText, setHeaderText] = useState(() => {
    const saved = localStorage.getItem('gimpo_header');
    return saved ? JSON.parse(saved) : { line1: 'WELCOME', line2: 'SKE 197' };
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('gimpo_notice', JSON.stringify(notice));
  }, [notice]);

  useEffect(() => {
    localStorage.setItem('gimpo_header', JSON.stringify(headerText));
  }, [headerText]);

  useEffect(() => {
    const handleHashChange = () => {
      const newView = window.location.hash.replace('#/', '') || 'home';
      setView(newView);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Home events={events} meals={meals} notice={notice} headerText={headerText} onNavigate={(path) => window.location.hash = path} />;
      case 'hall':
        return <Layout title="회관 소개" onBack={() => window.location.hash = '/'}><GimpoHall /></Layout>;
      case 'meal':
        return <Layout title="식단표" onBack={() => window.location.hash = '/'}><MealPlan meals={meals} /></Layout>;
      case 'dorm':
        return <Layout title="숙소 관리" onBack={() => window.location.hash = '/'}><DormitoryServices /></Layout>;
      case 'calendar':
        return <Layout title="학사 일정" onBack={() => window.location.hash = '/'}><Calendar events={events} /></Layout>;
      case 'faq':
        return <Layout title="자주 묻는 질문" onBack={() => window.location.hash = '/'}><FAQ categories={faq} /></Layout>;
      case 'graduation':
        return <Layout title="졸업 정보" onBack={() => window.location.hash = '/'}><Graduation /></Layout>;
      case 'explore':
        return <Layout title="김포 이야기" onBack={() => window.location.hash = '/'}><ExploreGimpo places={places} restaurants={restaurants} /></Layout>;
      case 'contact':
        return <Layout title="연락처 & 문의" onBack={() => window.location.hash = '/'}><ContactUs staff={staff} /></Layout>;
      case 'admin/login':
        return isAdmin ? 
          <Layout title="Admin Panel" showHome={false}>
            <AdminDashboard 
              onLogout={() => setIsAdmin(false)} 
              notice={notice} 
              headerText={headerText}
              onUpdateNotice={(msg, act) => setNotice({ ...notice, message: msg, active: act })} 
              onUpdateHeader={(l1, l2) => setHeaderText({ line1: l1, line2: l2 })}
            />
          </Layout> : 
          <Layout title="Admin Login" onBack={() => window.location.hash = '/'}><AdminLogin onLogin={() => setIsAdmin(true)} /></Layout>;
      default:
        return (
          <Layout title="Not Found" onBack={() => window.location.hash = '/'}>
            <div className="p-10 text-center flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <SettingsIcon size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">페이지를 찾을 수 없습니다</h2>
                <p className="text-slate-400 text-sm">This page does not exist or is under construction.</p>
              </div>
            </div>
          </Layout>
        );
    }
  };

  return <div className="antialiased font-sans select-none">{renderContent()}</div>;
};

export default App;
