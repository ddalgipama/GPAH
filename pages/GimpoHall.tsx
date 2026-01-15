
import React from 'react';
import { MapPin, Navigation, Bus, Car, CreditCard, ExternalLink } from 'lucide-react';
import { MY_MAPS_URL } from '../constants';

const MapPreview: React.FC<{ title: string, sub: string, zoom: string }> = ({ title, sub, zoom }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end px-1">
      <div>
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{sub}</p>
      </div>
      <a href={MY_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1 text-xs font-bold">
        전체 지도 보기 <ExternalLink size={12} />
      </a>
    </div>
    <div 
      onClick={() => window.open(MY_MAPS_URL, '_blank')}
      className="relative w-full h-40 bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 shadow-inner active:scale-[0.98] transition-all cursor-pointer group"
    >
      <img 
        src={`https://api.placeholder.com/600/300?text=Map+Preview+(${zoom})`} 
        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
        alt="Map Preview"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <MapPin className="text-slate-400 group-hover:text-blue-500 transition-colors" size={32} />
      </div>
    </div>
  </div>
);

const TransportCard: React.FC<{ title: string, items: {label: string, value: string}[] }> = ({ title, items }) => (
  <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-900" /> {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
          <span className="text-slate-700 font-medium">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

const GimpoHall: React.FC = () => {
  return (
    <div className="p-5 space-y-10 pb-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Gimpo Assembly Hall</h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">김포대회회관 소개</p>
        </div>
        
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 text-slate-900 rounded-xl">
              <MapPin size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</p>
              <p className="font-bold text-slate-800 leading-snug">
                여호와의증인의 김포대회회관:<br/>
                경기 김포시 통진읍 옹달샘로81번길 114
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Sections */}
      <section className="space-y-8">
        <MapPreview title="단지 지도" sub="On-site Map" zoom="Detail" />
        <MapPreview title="주변 시설" sub="Nearby Facilities" zoom="Medium" />
        <MapPreview title="광역 이동 지도" sub="Wider Area" zoom="Wide" />
      </section>

      {/* Transportation */}
      <section className="space-y-4">
        <div className="px-1">
          <h3 className="font-bold text-slate-900 text-lg">교통 정보 <span className="text-slate-400 font-medium text-sm ml-2">Transportation</span></h3>
        </div>

        <div className="space-y-4">
          <TransportCard 
            title="버스 이용 (Bus)" 
            items={[
              { label: '90번', value: '구래역 (약 40분)' },
              { label: '88번', value: '사우역 / 김포 왕국회관 (약 50분)' },
              { label: '카드 충전', value: '편의점에서 "충전해 주세요."' }
            ]} 
          />

          <TransportCard 
            title="택시 이용 (Taxi)" 
            items={[
              { label: '김포공항', value: '약 40,000원' },
              { label: '김포 왕국회관', value: '±20,000원' },
              { label: 'Destination Phrase', value: '“여기로 가 주세요.” (Take me here, please)' }
            ]} 
          />
        </div>
      </section>
    </div>
  );
};

export default GimpoHall;
