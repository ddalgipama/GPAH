
import React, { useState } from 'react';
import { GraduationCap, Hotel, Bus, ChevronRight, ArrowLeft, Send } from 'lucide-react';

interface SurveyFormProps {
  type: 'PRELIMINARY' | 'FINAL';
  onBack: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ type, onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const isFinal = type === 'FINAL';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to state/API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh] animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <Send size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">제출 완료!</h3>
        <p className="text-slate-500 mb-8 leading-relaxed">
          설문에 참여해주셔서 감사합니다.<br/>
          {isFinal ? '최종 예약 정보가 관리자에게 전달되었습니다.' : '사전 조사가 완료되었습니다.'}
        </p>
        <button 
          onClick={onBack}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 active:scale-95 transition-transform"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 mb-6 font-medium text-sm">
        <ArrowLeft size={16} /> Back to Graduation
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
          {isFinal ? '2차 확정 예약' : '1차 사전 조사'}
        </h2>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wide mt-1">
          {isFinal ? 'Final Reservation' : 'Preliminary Survey'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {isFinal && (
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl mb-4">
            <p className="text-rose-800 font-bold text-sm">
              ⚠️ 제출 후 예약 변경/취소가 불가합니다.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Room Number</label>
            <input required type="text" placeholder="e.g. 101" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Student Name</label>
            <input required type="text" placeholder="Initials or full name" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Number of Guests</label>
            <input required type="number" min="0" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none" />
          </div>
          
          {isFinal ? (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Room Type</label>
              <select required className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none appearance-none">
                <option value="">Select Room Type</option>
                <option value="double">2인 1실 (더블룸)</option>
                <option value="twin">2인 1실 (트윈룸)</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Rooms Needed (Approx)</label>
              <input required type="number" min="0" placeholder="2인 1실 기준" className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none" />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Notes</label>
            <textarea rows={3} placeholder="Extra requests or questions..." className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-slate-900 transition-all outline-none resize-none"></textarea>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 active:scale-95 transition-transform"
        >
          Submit Response
        </button>
      </form>
    </div>
  );
};

const Graduation: React.FC = () => {
  const [view, setView] = useState<'MAIN' | 'INVITATION' | 'HOTEL_MENU' | 'SURVEY_1' | 'SURVEY_2' | 'SHUTTLE'>('MAIN');

  if (view === 'HOTEL_MENU') {
    return (
      <div className="p-5 animate-in slide-in-from-right-4 duration-300">
        <button onClick={() => setView('MAIN')} className="flex items-center gap-2 text-slate-500 mb-6 font-medium text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Hotel Reservation</h2>
        <div className="space-y-4">
          <button 
            onClick={() => setView('SURVEY_1')}
            className="w-full p-6 bg-white rounded-3xl shadow-sm border border-slate-100 text-left flex items-center justify-between group"
          >
            <div>
              <p className="font-bold text-slate-800 mb-1">1차 사전 조사</p>
              <p className="text-xs text-slate-400 font-medium">Preliminary Survey</p>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-active:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setView('SURVEY_2')}
            className="w-full p-6 bg-white rounded-3xl shadow-sm border border-slate-100 text-left flex items-center justify-between group"
          >
            <div>
              <p className="font-bold text-slate-800 mb-1">2차 확정 예약</p>
              <p className="text-xs text-slate-400 font-medium">Final Reservation</p>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-active:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (view === 'SURVEY_1') return <SurveyForm type="PRELIMINARY" onBack={() => setView('HOTEL_MENU')} />;
  if (view === 'SURVEY_2') return <SurveyForm type="FINAL" onBack={() => setView('HOTEL_MENU')} />;

  if (view === 'INVITATION' || view === 'SHUTTLE') {
    return (
      <div className="p-5 animate-in slide-in-from-right-4 duration-300">
        <button onClick={() => setView('MAIN')} className="flex items-center gap-2 text-slate-500 mb-6 font-medium text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {view === 'INVITATION' ? '졸업식 초대장' : '셔틀버스 안내'}
        </h2>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 prose prose-slate">
          <img src={`https://picsum.photos/600/300?random=${view === 'INVITATION' ? 10 : 11}`} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-sm" alt="Feature" />
          <p className="text-slate-600 leading-relaxed">
            {view === 'INVITATION' 
              ? '학생들의 졸업을 진심으로 축하드립니다. 뜻깊은 졸업식 행사에 초대합니다. 행사 장소와 시간 등 상세 내용을 확인해 주세요.' 
              : '졸업식 당일 김포공항 및 주요 거점에서 행사장까지 셔틀버스를 운영합니다. 탑승 장소와 시간을 미리 숙지해 주시기 바랍니다.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Graduation</h2>
        <p className="text-slate-400 text-sm font-medium">Invitation & Logistics</p>
      </div>

      <div className="space-y-4">
        {[
          { id: 'INVITATION', icon: <GraduationCap className="text-rose-500" />, title: '졸업식 초대장', sub: 'Invitation' },
          { id: 'HOTEL_MENU', icon: <Hotel className="text-amber-500" />, title: '호텔 예약', sub: 'Hotel Reservation' },
          { id: 'SHUTTLE', icon: <Bus className="text-blue-500" />, title: '셔틀버스 안내', sub: 'Shuttle Bus' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className="w-full flex items-center gap-5 p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 active:scale-[0.98] transition-all text-left group"
          >
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
              {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-lg leading-tight">{item.title}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.sub}</p>
            </div>
            <ChevronRight className="text-slate-200" size={24} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Graduation;
