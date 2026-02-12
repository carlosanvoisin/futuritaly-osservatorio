import React, { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[70] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#1B2A4A] text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3 pr-10 relative overflow-hidden">
        <div className="bg-green-500 rounded-full p-1">
          <CheckCircle size={14} className="text-white" />
        </div>
        <span className="font-medium text-sm">{message}</span>
        <button 
          onClick={onClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
        <div className="absolute bottom-0 left-0 h-1 bg-green-500 animate-[width_3s_linear_forwards]" style={{width: '100%'}}></div>
      </div>
    </div>
  );
};

export default Toast;