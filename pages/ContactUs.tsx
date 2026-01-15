
import React, { useState } from 'react';
import { StaffContact } from '../types';
import { Phone, Mail, ShieldAlert, Send, Camera, Check } from 'lucide-react';

const ContactUs: React.FC<{ staff: StaffContact[] }> = ({ staff }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="p-5 space-y-12 pb-12">
      {/* Header */}
      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">연락처 & 문의</p>
      </section>

      {/* Staff Contacts */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">담당자 연락처 · Staff</h3>
        <div className="space-y-3">
          {staff.map(s => (
            <div key={s.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex justify-between items-center group active:scale-[0.98] transition-all">
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-lg">{s.name}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{s.role}</p>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${s.phone}`} className="w-11 h-11 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center border border-slate-100 active:bg-slate-900 active:text-white transition-colors">
                  <Phone size={20} />
                </a>
                <a href={`mailto:${s.email}`} className="w-11 h-11 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center border border-slate-100 active:bg-slate-900 active:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency */}
      <section className="bg-rose-50 border-2 border-rose-100 rounded-[2rem] p-8 space-y-4 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-rose-600 font-bold text-xl flex items-center gap-2 mb-4">
            <ShieldAlert size={24} /> 긴급 상황 안내
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-rose-100">
              <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Fire / Med</p>
              <p className="text-2xl font-black text-rose-600">119</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-rose-100">
              <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Police</p>
              <p className="text-2xl font-black text-rose-600">112</p>
            </div>
          </div>
          <p className="text-rose-800/60 text-[10px] font-bold mt-4 italic uppercase tracking-wider text-center">In case of emergency, please dial these numbers.</p>
        </div>
      </section>

      {/* Suggestion Form */}
      <section className="space-y-4">
        <div className="px-1">
          <h3 className="font-bold text-slate-900 text-lg leading-tight">건의 및 시설 제보</h3>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-0.5">Problem Report & Suggestion</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[2rem] text-center flex flex-col items-center gap-4 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
              <Check size={32} />
            </div>
            <h4 className="text-emerald-900 font-bold text-xl">제출되었습니다!</h4>
            <p className="text-emerald-700/70 text-sm">소중한 의견 감사합니다. 관리자가 검토 후 연락드리겠습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="객실 번호 (Room)" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none" />
              <input required type="text" placeholder="이름 (Name)" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none" />
            </div>
            <select required className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none appearance-none">
              <option value="">카테고리 선택 (Category)</option>
              <option value="room">객실 관련 (Room Issue)</option>
              <option value="facility">시설 관련 (Facility Issue)</option>
              <option value="noise">소음/청결 (Noise/Cleanliness)</option>
              <option value="suggestion">제안 사항 (Suggestion)</option>
              <option value="other">기타 (Other)</option>
            </select>
            <input required type="text" placeholder="제목 (Title)" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none" />
            <textarea required rows={5} placeholder="상세 설명 (Detailed description...)" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none resize-none" />
            
            {/* Photo Upload Simulation */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-slate-400 transition-all cursor-pointer">
              <Camera size={24} className="mb-2" />
              <p className="text-xs font-bold uppercase tracking-widest">사진 첨부 (0-3장)</p>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Reply Method</p>
              <div className="flex gap-4 px-1">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> Phone
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> Email
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" /> Visit
                </label>
              </div>
            </div>

            <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl shadow-slate-200">
              <Send size={20} /> 제출하기 (Submit)
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ContactUs;
