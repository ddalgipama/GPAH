
import React, { useState } from 'react';
import { Lock, Bell, ChevronLeft, ChevronRight, Utensils } from 'lucide-react';
import { MENU_ITEMS, EVENT_ICONS } from '../constants';
import { Event, Meal, Notice } from '../types';
import { formatDate, getIsoDate } from '../utils';

interface HomeProps {
  events: Event[];
  meals: Meal[];
  notice: Notice;
  headerText: { line1: string; line2: string };
  onNavigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ events, meals, notice, headerText, onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showNotice, setShowNotice] = useState(false);

  const isoToday = getIsoDate(currentDate);
  const todaysEvents = events.filter(e => e.date === isoToday);
  const todaysMeals = meals.filter(m => m.date === isoToday);

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col gap-6 p-5">
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">
            {headerText.line1}
          </p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1.5">
            {headerText.line2}
          </h2>
          <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit uppercase tracking-wider">
            Today · {formatDate(currentDate)}
          </p>
        </div>
        <div className="flex gap-2">
          {notice.active && (
            <button 
              onClick={() => setShowNotice(true)}
              className="p-2.5 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100 animate-pulse shadow-sm"
            >
              <Bell size={20} />
            </button>
          )}
          <button 
            onClick={() => onNavigate('/admin/login')}
            className="p-2.5 bg-white text-slate-400 rounded-2xl border border-slate-100 shadow-sm hover:text-slate-900 transition-colors"
          >
            <Lock size={20} />
          </button>
        </div>
      </div>

      {/* Notice Popup */}
      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md transition-all">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xs p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-4 bg-orange-50 text-orange-600 rounded-full mb-4">
                <Bell size={32} />
              </div>
              <h3 className="font-bold text-xl text-slate-900">Urgent Notice</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">공지사항</p>
            </div>
            <p className="text-slate-600 leading-relaxed mb-8 text-center text-sm">
              {notice.message}
            </p>
            <button 
              onClick={() => setShowNotice(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 active:scale-95 transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      <section className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <div className="space-y-0.5">
            <h3 className="font-bold text-slate-800 text-lg">오늘의 스케줄</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Today's Schedule</p>
          </div>
          <div className="flex gap-1.5 bg-slate-50 p-1 rounded-xl">
            <button onClick={() => changeDate(-1)} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-slate-900"><ChevronLeft size={18}/></button>
            <button onClick={() => changeDate(1)} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-slate-900"><ChevronRight size={18}/></button>
          </div>
        </div>
        
        <div className="space-y-3">
          {todaysEvents.length > 0 ? todaysEvents.map(event => (
            <div key={event.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 transition-transform active:scale-[0.98]">
              <div className="flex-shrink-0 w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                {EVENT_ICONS[event.type]}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-slate-800 truncate">{event.title_ko}</p>
                <div className="flex items-center gap-2 mt-0.5">
                   <p className="text-[10px] font-bold text-slate-400 uppercase">{event.time}</p>
                   <span className="text-slate-200">|</span>
                   <p className="text-[10px] font-bold text-slate-400 truncate">{event.location}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-8">
              <p className="text-slate-300 text-sm italic font-medium">오늘 등록된 일정이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Today's Meal */}
      <section className="bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="space-y-0.5 mb-6">
            <h3 className="font-bold text-lg">오늘의 식단</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Today's Meal</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                <Utensils size={12}/> LUNCH 🍽
              </div>
              <div className="space-y-3">
                {todaysMeals.filter(m => m.meal === 'LUNCH').map(m => (
                  <div key={m.id} className="group">
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-bold text-slate-100 text-sm leading-tight">{m.menu_ko}</span>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {m.spicy && <span className="text-xs">🌶</span>}
                        {m.seafood && <span className="text-xs">🐟</span>}
                        {m.peanut && <span className="text-xs">🥜</span>}
                        {m.wheat && <span className="text-xs">🌾</span>}
                      </div>
                    </div>
                    {m.menu_en && <p className="text-[9px] text-slate-500 font-medium uppercase mt-0.5 truncate">{m.menu_en}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-orange-400 uppercase tracking-widest">
                <Utensils size={12}/> DINNER 🌙
              </div>
              <div className="space-y-3">
                {todaysMeals.filter(m => m.meal === 'DINNER').map(m => (
                  <div key={m.id} className="group">
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-bold text-slate-100 text-sm leading-tight">{m.menu_ko}</span>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {m.spicy && <span className="text-xs">🌶</span>}
                        {m.seafood && <span className="text-xs">🐟</span>}
                        {m.peanut && <span className="text-xs">🥜</span>}
                        {m.wheat && <span className="text-xs">🌾</span>}
                      </div>
                    </div>
                    {m.menu_en && <p className="text-[9px] text-slate-500 font-medium uppercase mt-0.5 truncate">{m.menu_en}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full translate-x-1/2 -translate-y-1/2 opacity-20" />
      </section>

      {/* Main Grid Navigation */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        {MENU_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.path.replace('#', ''))}
            className="flex flex-col items-start p-5 bg-white rounded-[2rem] shadow-sm border border-slate-100 active:bg-slate-50 active:scale-95 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
              {item.icon}
            </div>
            <h4 className="font-bold text-slate-900 text-sm leading-tight pr-2">{item.label}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{item.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
