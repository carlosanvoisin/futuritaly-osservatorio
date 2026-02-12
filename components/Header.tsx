import React, { useState } from 'react';
import { Bell, Search, RefreshCw } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  showToast: (msg: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, showToast }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    showToast("Sincronizzazione database avviata...");
    setTimeout(() => {
      setIsSyncing(false);
      showToast("Dati aggiornati con successo da ANAC/TED.");
    }, 2000);
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-[#1B2A4A]">Osservatorio Strategico AI</h2>
        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded border border-blue-100 font-medium">
          v2.4.0 Demo
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <button 
          onClick={handleSync}
          className={`hidden md:flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 transition-all active:scale-95 hover:bg-gray-100 ${isSyncing ? 'opacity-75 cursor-wait' : ''}`}
        >
          <RefreshCw size={14} className={`mr-2 text-green-600 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Sync dati: <span className="font-medium text-gray-700">Oggi, 09:42</span></span>
        </button>

        <button 
          onClick={() => onNavigate(Page.NOTIFICATIONS)}
          className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors active:scale-95 outline-none focus:ring-2 focus:ring-blue-100"
        >
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="text-right hidden lg:block">
          <p className="text-xs text-gray-400">Powered by</p>
          <p className="text-sm font-bold text-[#1B2A4A] flex items-center">
            HeyAI <span className="text-gray-400 mx-1">×</span> FuturItaly
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;