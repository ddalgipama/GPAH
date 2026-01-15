
import React from 'react';
import { ExplorePlace, Restaurant } from '../types';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { MY_MAPS_URL } from '../constants';

const PlaceCard: React.FC<{ place: ExplorePlace }> = ({ place }) => (
  <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group">
    <div className="h-48 overflow-hidden relative">
      <img src={place.imageUrl} alt={place.name_ko} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
        <h4 className="text-white font-bold text-xl">{place.name_ko}</h4>
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{place.name_en}</p>
      </div>
    </div>
    <div className="p-5 space-y-4">
      <p className="text-slate-600 text-sm leading-relaxed">{place.description}</p>
      <button 
        onClick={() => window.open(MY_MAPS_URL, '_blank')}
        className="w-full py-3 bg-slate-50 text-slate-800 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-slate-100 transition-colors"
      >
        <MapPin size={16} /> 지도에서 보기
      </button>
    </div>
  </div>
);

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => (
  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-start gap-4">
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-slate-900 text-lg leading-tight">{restaurant.name}</h4>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase tracking-widest">
          {restaurant.category}
        </span>
      </div>
      <p className="text-sm text-slate-600">{restaurant.description}</p>
      <div className="flex items-center justify-between pt-1">
        <div className="flex gap-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < restaurant.priceLevel ? 'text-emerald-500' : 'text-slate-200'}`}>💸</span>
          ))}
        </div>
        <button 
          onClick={() => window.open(MY_MAPS_URL, '_blank')}
          className="text-xs font-bold text-blue-500 flex items-center gap-1"
        >
          지도에서 보기 <Navigation size={12} />
        </button>
      </div>
    </div>
  </div>
);

const ExploreGimpo: React.FC<{ places: ExplorePlace[], restaurants: Restaurant[] }> = ({ places, restaurants }) => {
  return (
    <div className="p-5 space-y-12 pb-12">
      {/* Intro */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Explore Gimpo</h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">김포 이야기</p>
        </div>
        <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <p className="text-xl font-bold leading-tight">김포는 한강과 서해를 잇는 평화로운 도시입니다.</p>
            <p className="text-slate-400 text-sm italic">Gimpo is a peaceful city connecting the Han River and the West Sea.</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" />
        </div>
      </section>

      {/* Attractions */}
      <section className="space-y-6">
        <div className="px-1 flex justify-between items-end">
          <h3 className="font-bold text-slate-900 text-lg">가볼만한 곳 <span className="text-slate-400 font-medium text-sm ml-2">Attractions</span></h3>
        </div>
        
        {/* Small Map Preview Section */}
        <div className="bg-slate-100 h-40 rounded-3xl mb-6 relative overflow-hidden group cursor-pointer" onClick={() => window.open(MY_MAPS_URL, '_blank')}>
          <img src="https://api.placeholder.com/600/300?text=Attractions+Map+Preview" className="w-full h-full object-cover opacity-60" alt="Map" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" /> 지도로 전체 보기
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {places.map(place => <PlaceCard key={place.id} place={place} />)}
        </div>
      </section>

      {/* Restaurants */}
      <section className="space-y-6">
        <div className="px-1">
          <h3 className="font-bold text-slate-900 text-lg">주변 맛집 <span className="text-slate-400 font-medium text-sm ml-2">Restaurants</span></h3>
        </div>

        <div className="bg-slate-100 h-40 rounded-3xl mb-6 relative overflow-hidden group cursor-pointer" onClick={() => window.open(MY_MAPS_URL, '_blank')}>
          <img src="https://api.placeholder.com/600/300?text=Restaurants+Map+Preview" className="w-full h-full object-cover opacity-60" alt="Map" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2">
              <MapPin size={16} className="text-orange-500" /> 지도로 전체 보기
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {restaurants.map(rest => <RestaurantCard key={rest.id} restaurant={rest} />)}
        </div>
      </section>
    </div>
  );
};

export default ExploreGimpo;
