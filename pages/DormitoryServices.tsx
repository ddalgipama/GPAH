
import React, { useState } from 'react';
import { DORM_CATEGORIES } from '../constants';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const DormDetail: React.FC<{ categoryId: string, onBack: () => void }> = ({ categoryId, onBack }) => {
  const category = DORM_CATEGORIES.find(c => c.id === categoryId);
  
  return (
    <div className="p-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 mb-6 font-medium text-sm">
        <ArrowLeft size={16} /> Back to Services
      </button>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
          {category?.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">{category?.label}</h2>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">{category?.sub}</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        {categoryId === 'cleaning' || categoryId === 'laundry' ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              <p className="text-blue-800 font-medium text-sm">
                💡 서비스 일정을 확인하고 객실 문 앞에 세탁물을 놓아주세요.
              </p>
            </div>
            
            <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-3 px-4 text-left text-xs font-bold text-slate-500 uppercase">Day</th>
                  <th className="py-3 px-4 text-left text-xs font-bold text-slate-500 uppercase">Rooms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-4 text-sm font-bold">MON</td>
                  <td className="py-4 px-4 text-sm text-slate-600">101 ~ 110</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm font-bold">TUE</td>
                  <td className="py-4 px-4 text-sm text-slate-600">111 ~ 120</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm font-bold">WED</td>
                  <td className="py-4 px-4 text-sm text-slate-600">201 ~ 210</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-slate-600">
              <p className="leading-relaxed">
                {category?.label} 서비스는 이번 학기 학사 일정에 따라 제공됩니다. 
                상세 일정은 Calendar 메뉴에서 해당 서비스 아이콘을 확인해 주세요.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <span className="text-sm font-medium">예약 필요 여부: 선착순 현장 대기</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <span className="text-sm font-medium">위치: 본관 B1층 서비스룸</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DormitoryServices: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    return <DormDetail categoryId={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Services</h2>
        <p className="text-slate-400 text-sm font-medium">Dormitory management & support</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {DORM_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 active:scale-95 transition-all text-center group"
          >
            <div className="mb-4 transform group-active:scale-110 transition-transform">
              {cat.icon}
            </div>
            <h4 className="font-bold text-slate-800 mb-1">{cat.label}</h4>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {cat.sub} <ChevronRight size={12} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DormitoryServices;
