
import React, { useState } from 'react';
import { Event } from '../types';
import { getIsoDate } from '../utils';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { EVENT_ICONS } from '../constants';

const Calendar: React.FC<{ events: Event[] }> = ({ events }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getIsoDate(new Date()));

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const selectedEvents = events.filter(e => e.date === selectedDate);

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">학사 일정</h2>
        <p className="text-slate-400 text-sm font-medium">2026 Winter Term (8주 과정)</p>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-bold text-slate-900">
          {viewDate.getFullYear()}. {viewDate.getMonth() + 1}
        </h3>
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
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
            <div key={d} className="text-[10px] font-bold text-slate-400 text-center py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map(b => <div key={`b-${b}`} />)}
          {days.map(d => {
            const dateStr = getIsoDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
            const isSelected = dateStr === selectedDate;
            const hasEvents = events.some(e => e.date === dateStr);

            return (
              <button
                key={d}
                onClick={() => setSelectedDate(dateStr)}
                className={`
                  relative h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all
                  ${isSelected ? 'bg-slate-900 text-white shadow-xl scale-110 z-10' : 'hover:bg-slate-50 text-slate-700'}
                `}
              >
                {d}
                {hasEvents && !isSelected && (
                  <div className="absolute bottom-2 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900 px-1">
          일정 상세 <span className="text-slate-400 font-normal text-sm">{selectedDate}</span>
        </h3>

        <div className="space-y-3">
          {selectedEvents.length > 0 ? (
            selectedEvents.map(event => (
              <div key={event.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100">
                  {EVENT_ICONS[event.type]}
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">{event.title_ko}</h4>
                    {event.title_en && <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{event.title_en}</p>}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {event.time && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock size={14} className="text-slate-400" /> {event.time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin size={14} className="text-slate-400" /> {event.location}
                      </div>
                    )}
                  </div>
                  {event.description_ko && (
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-50">
                      {event.description_ko}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/50 rounded-3xl p-8 text-center border border-dashed border-slate-200">
              <p className="text-slate-400 text-sm italic">선택한 날짜에 일정이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
