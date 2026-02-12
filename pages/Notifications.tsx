import React, { useState } from 'react';
import { Bell, Clock, Star, Info, Check } from 'lucide-react';

interface NotificationsProps {
  showToast: (msg: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ showToast }) => {
  const [notifs, setNotifs] = useState([
    { id: 1, type: 'opportunity', msg: 'Nuovo bando "Digital Europe" corrisponde al 95% con il tuo profilo.', time: '2 ore fa', important: true, read: false },
    { id: 2, type: 'deadline', msg: 'Bando MIMIT in scadenza tra 3 giorni. Richiesto check documenti.', time: '5 ore fa', important: true, read: false },
    { id: 3, type: 'system', msg: 'Aggiornamento database ANAC completato con successo.', time: 'Ieri', important: false, read: true },
    { id: 4, type: 'opportunity', msg: 'Regione Lazio ha pubblicato nuovi fondi per PMI.', time: 'Ieri', important: false, read: true },
  ]);

  const handleRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
    showToast("Notifica segnata come letta.");
  };

  const handleMarkAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
    showToast("Tutte le notifiche segnate come lette.");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">Centro Notifiche</h1>
        <button 
          onClick={handleMarkAllRead}
          className="text-sm text-[#0077B6] font-medium hover:underline"
        >
          Segna tutte come lette
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
        {notifs.map((n) => (
          <div 
            key={n.id} 
            className={`p-4 flex items-start transition-colors ${!n.read ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-gray-50'}`}
          >
             <div className={`p-2 rounded-full mr-4 flex-shrink-0 ${
               n.type === 'opportunity' ? 'bg-green-100 text-green-600' :
               n.type === 'deadline' ? 'bg-amber-100 text-amber-600' :
               'bg-gray-100 text-gray-600'
             }`}>
               {n.type === 'opportunity' ? <Star size={18} /> : 
                n.type === 'deadline' ? <Clock size={18} /> : 
                <Info size={18} />}
             </div>
             <div className="flex-1 cursor-pointer" onClick={() => !n.read && handleRead(n.id)}>
               <p className={`text-sm ${!n.read ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                 {n.msg}
               </p>
               <p className="text-xs text-gray-500 mt-1">{n.time}</p>
             </div>
             <div className="flex items-center">
                {n.important && <span className="w-2 h-2 bg-red-500 rounded-full mr-3" title="Importante"></span>}
                {!n.read && (
                  <button 
                    onClick={() => handleRead(n.id)}
                    className="p-1 text-gray-400 hover:text-[#0077B6] rounded-full hover:bg-blue-100 transition-colors"
                    title="Segna come letta"
                  >
                    <Check size={16} />
                  </button>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;