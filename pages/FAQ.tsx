
import React, { useState } from 'react';
import { FAQCategory } from '../types';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC<{ categories: FAQCategory[] }> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Frequently Asked Questions</p>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-900" size={20} />
        <input 
          type="text" 
          placeholder="도움말 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-2 ring-slate-900 outline-none transition-all shadow-sm"
        />
      </div>

      <div className="space-y-8">
        {filteredCategories.map(cat => (
          <div key={cat.id} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              {cat.name_ko} · {cat.name_en}
            </h3>
            <div className="space-y-2">
              {cat.items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="w-full flex items-start justify-between p-4 text-left transition-colors hover:bg-slate-50/50"
                  >
                    <span className="font-bold text-slate-800 pr-4 leading-snug">{item.question}</span>
                    {expandedId === item.id ? <ChevronUp className="text-slate-400" size={20}/> : <ChevronDown className="text-slate-400" size={20}/>}
                  </button>
                  {expandedId === item.id && (
                    <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="h-px bg-slate-50 mb-4" />
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 italic">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
