
import React from 'react';
import { ChevronLeft, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  showHome?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, onBack, showHome = true }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-lg flex flex-col relative">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            {onBack && (
              <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="font-bold text-lg text-slate-800 tracking-tight">{title || 'Gimpo Hall'}</h1>
          </div>
          <div className="flex items-center gap-3">
            {showHome && (
              <button onClick={() => window.location.hash = '/'} className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                <Home size={22} />
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
