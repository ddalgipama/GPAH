
import React, { useState } from 'react';
import { Meal } from '../types';
import { getIsoDate } from '../utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MealPlan: React.FC<{ meals: Meal[] }> = ({ meals }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getIsoDate(new Date()));

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const selectedMeals = meals.filter(m => m.date === selectedDate);

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-slate-900">
          {viewDate.getFullYear()}. {viewDate.getMonth() + 1}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 active:scale-90 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => changeMonth(1)} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 active:scale-90 transition-transform">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
            <div key={d} className="text-[10px] font-bold text-slate-400 text-center py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map(b => <div key={`b-${b}`} />)}
          {days.map(d => {
            const dateStr = getIsoDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
            const isToday = dateStr === getIsoDate(new Date());
            const isSelected = dateStr === selectedDate;
            const hasMeals = meals.some(m => m.date === dateStr);

            return (
              <button
                key={d}
                onClick={() => setSelectedDate(dateStr)}
                className={`
                  relative h-11 rounded-xl flex items-center justify-center text-sm font-semibold transition-all
                  ${isSelected ? 'bg-slate-900 text-white shadow-lg scale-105 z-10' : 'hover:bg-slate-50'}
                  ${isToday && !isSelected ? 'text-blue-600 border border-blue-100' : 'text-slate-700'}
                `}
              >
                {d}
                {hasMeals && !isSelected && (
                  <div className="absolute bottom-1.5 w-1 h-1 bg-slate-300 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Meals */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900 px-1">
          식단 안내 <span className="text-slate-400 font-normal text-sm">{selectedDate}</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {['LUNCH', 'DINNER'].map(type => (
            <div key={type} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                {type === 'LUNCH' ? '🍽 LUNCH' : '🌙 DINNER'}
              </div>
              <div className="space-y-3">
                {selectedMeals.filter(m => m.meal === type).length > 0 ? (
                  selectedMeals.filter(m => m.meal === type).map(m => (
                    <div key={m.id} className="flex items-start justify-between gap-4 group">
                      <div>
                        <p className="font-bold text-slate-800 text-base">{m.menu_ko}</p>
                        {m.menu_en && <p className="text-xs text-slate-400 italic font-medium">{m.menu_en}</p>}
                      </div>
                      <div className="flex gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                        {m.spicy && <span title="Spicy">🌶</span>}
                        {m.seafood && <span title="Seafood Allergy">🐟</span>}
                        {m.peanut && <span title="Peanut Allergy">🥜</span>}
                        {m.wheat && <span title="Wheat/Gluten Allergy">🌾</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic">등록된 정보가 없습니다.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
