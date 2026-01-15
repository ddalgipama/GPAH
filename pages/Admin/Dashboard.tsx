
import React, { useState } from 'react';
import { Settings, Upload, FileText, Users, Megaphone, LogOut, ChevronRight, Layout as LayoutIcon, Save } from 'lucide-react';
import { Notice } from '../../types';

interface AdminDashboardProps {
  onLogout: () => void;
  notice: Notice;
  headerText: { line1: string; line2: string };
  onUpdateNotice: (msg: string, active: boolean) => void;
  onUpdateHeader: (line1: string, line2: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, notice, headerText, onUpdateNotice, onUpdateHeader }) => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'UPLOAD' | 'NOTICE' | 'FAQ' | 'CONTACT' | 'HEADER'>('HOME');
  
  // Notice states
  const [tempNotice, setTempNotice] = useState(notice.message);
  const [noticeActive, setNoticeActive] = useState(notice.active);

  // Header states
  const [tempH1, setTempH1] = useState(headerText.line1);
  const [tempH2, setTempH2] = useState(headerText.line2);

  const menuItems = [
    { id: 'HEADER', label: '홈 헤더 텍스트 설정', sub: 'Home Header Text', icon: <LayoutIcon size={24}/> },
    { id: 'UPLOAD', label: '학기 설정 & 데이터 업로드', sub: 'Term & Excel Data', icon: <Upload size={24}/> },
    { id: 'FAQ', label: 'FAQ 관리', sub: 'FAQ Management', icon: <FileText size={24}/> },
    { id: 'CONTACT', label: 'Contact Us 관리', sub: 'Staff & Contacts', icon: <Users size={24}/> },
    { id: 'NOTICE', label: '공지사항 설정', sub: 'Emergency Notice', icon: <Megaphone size={24}/> },
  ];

  if (activeTab === 'NOTICE') {
    return (
      <div className="p-5 animate-in slide-in-from-right-4 duration-300">
        <button onClick={() => setActiveTab('HOME')} className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-1 uppercase tracking-widest">
          <ChevronRight size={14} className="rotate-180" /> Dashboard
        </button>
        <h2 className="text-2xl font-black text-slate-900 mb-8">공지사항 설정</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
            <div>
              <p className="font-bold text-slate-800">공지 활성화</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Enable urgent notice on Home</p>
            </div>
            <button 
              onClick={() => setNoticeActive(!noticeActive)}
              className={`w-14 h-7 rounded-full transition-all relative ${noticeActive ? 'bg-orange-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${noticeActive ? 'left-8' : 'left-1'}`} />
            </button>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Emergency Message</label>
            <textarea 
              rows={5}
              value={tempNotice}
              onChange={(e) => setTempNotice(e.target.value)}
              className="w-full p-6 bg-white border border-slate-200 rounded-[2rem] outline-none focus:ring-4 ring-slate-900/5 transition-all shadow-inner"
              placeholder="Enter urgent message here..."
            />
          </div>
          <button 
            onClick={() => { onUpdateNotice(tempNotice, noticeActive); setActiveTab('HOME'); }}
            className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 transition-all"
          >
            <Save size={20} /> Update Notice
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === 'HEADER') {
    return (
      <div className="p-5 animate-in slide-in-from-right-4 duration-300">
        <button onClick={() => setActiveTab('HOME')} className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-1 uppercase tracking-widest">
          <ChevronRight size={14} className="rotate-180" /> Dashboard
        </button>
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900">홈 헤더 텍스트</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Header Text Editor</p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-4">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Preview</p>
             <div className="flex flex-col">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{tempH1 || 'WELCOME'}</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{tempH2 || 'SKE 197'}</h2>
             </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Header Line 1 (Small)</label>
              <input 
                type="text" 
                value={tempH1}
                onChange={(e) => setTempH1(e.target.value)}
                className="w-full p-5 bg-white border border-slate-200 rounded-[1.5rem] outline-none focus:ring-4 ring-slate-900/5"
                placeholder="WELCOME"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Header Line 2 (Large)</label>
              <input 
                type="text" 
                value={tempH2}
                onChange={(e) => setTempH2(e.target.value)}
                className="w-full p-5 bg-white border border-slate-200 rounded-[1.5rem] outline-none focus:ring-4 ring-slate-900/5"
                placeholder="SKE 197"
              />
            </div>
            <button 
              onClick={() => { onUpdateHeader(tempH1, tempH2); setActiveTab('HOME'); }}
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 transition-all"
            >
              <Save size={20} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-10">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Management System</p>
        </div>
        <button onClick={onLogout} className="p-3 bg-rose-50 text-rose-500 rounded-2xl active:scale-90 transition-transform shadow-sm">
          <LogOut size={22} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className="flex items-center gap-5 p-6 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 active:scale-[0.98] transition-all text-left group"
          >
            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
              {item.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-base">{item.label}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.sub}</p>
            </div>
            <ChevronRight className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" size={20} />
          </button>
        ))}
      </div>

      <div className="pt-10">
        <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
             <Settings size={20} />
          </div>
          <div>
            <p className="text-blue-900 font-bold text-sm">System Settings</p>
            <p className="text-blue-400 text-[10px] font-medium">Last synced: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
