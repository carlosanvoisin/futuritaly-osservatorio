import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Coins, 
  PieChart, 
  Settings, 
  Bot, 
  Bell 
} from 'lucide-react';
import { Page } from '../types';
import { COLORS } from '../constants';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: Page.TENDERS, label: 'Cerca Bandi', icon: Search },
    { id: Page.GRANTS, label: 'Cerca Incentivi', icon: Coins },
    { id: Page.ANALYTICS, label: 'Analytics', icon: PieChart },
    { id: Page.PROFILE, label: 'Profilo Cliente', icon: Settings },
    { id: Page.AI_ASSISTANT, label: 'Assistente AI', icon: Bot },
    { id: Page.NOTIFICATIONS, label: 'Notifiche', icon: Bell },
  ];

  return (
    <div className="w-64 h-screen bg-[#1B2A4A] text-white flex flex-col shadow-xl fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-tight text-white">Futur<span className="font-light text-blue-300">Italy</span></h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Osservatorio AI</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-[#2E5090] text-white font-medium shadow-md' 
                      : 'text-gray-300 hover:bg-[#2E5090]/50 hover:text-white'
                  }`}
                >
                  <item.icon 
                    size={20} 
                    className={`mr-3 ${isActive ? 'text-[#00B4D8]' : 'text-gray-400 group-hover:text-white'}`} 
                  />
                  <span>{item.label}</span>
                  {item.id === Page.NOTIFICATIONS && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 bg-[#152039]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold">
            FI
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">FuturItaly Admin</p>
            <p className="text-xs text-gray-400 truncate">admin@futuritaly.it</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;