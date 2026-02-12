import React, { useState } from 'react';
import { CLIENT_PROFILE } from '../constants';
import { Building, MapPin, Target, FileText, CheckCircle2, Save, Edit2 } from 'lucide-react';

interface ProfileProps {
  showToast: (msg: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ showToast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(CLIENT_PROFILE);

  const handleSave = () => {
    setIsEditing(false);
    showToast("Profilo aziendale aggiornato correttamente.");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2A4A]">Profilo Cliente</h1>
          <p className="text-gray-500">Configurazione parametri per il motore di matching AI.</p>
        </div>
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            isEditing 
            ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm' 
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {isEditing ? <Save size={18} className="mr-2" /> : <Edit2 size={18} className="mr-2" />}
          {isEditing ? 'Salva Modifiche' : 'Modifica Dati'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#1B2A4A]">Dati Aziendali</h3>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Verificato</span>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase">Ragione Sociale</label>
            <div className="mt-1 flex items-center text-gray-800 font-semibold">
              <Building size={16} className="mr-2 text-gray-400" />
              {profile.company}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase">Sede Legale</label>
            <div className="mt-1 flex items-center text-gray-800 font-semibold">
              <MapPin size={16} className="mr-2 text-gray-400" />
              {isEditing ? (
                 <input 
                   type="text" 
                   value={profile.address}
                   onChange={(e) => setProfile({...profile, address: e.target.value})}
                   className="border-b border-gray-300 focus:border-[#1B2A4A] outline-none w-full bg-gray-50 px-1"
                 />
              ) : profile.address}
            </div>
          </div>
          <div>
             <label className="block text-xs font-medium text-gray-500 uppercase">Dimensione</label>
             <p className="mt-1 text-gray-800">{profile.size}</p>
          </div>
          <div>
             <label className="block text-xs font-medium text-gray-500 uppercase">Settore</label>
             <p className="mt-1 text-gray-800">{profile.sector}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-[#1B2A4A]">Codici ATECO & Expertise</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Codici ATECO Registrati</label>
            <div className="flex flex-wrap gap-2">
              {profile.ateco.map((code, idx) => (
                <span key={idx} className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-sm border border-blue-100 cursor-default">
                  <FileText size={14} className="mr-2" />
                  {code}
                </span>
              ))}
              {isEditing && (
                <button className="px-3 py-1 rounded-md border border-dashed border-gray-300 text-gray-400 text-sm hover:border-gray-400 hover:text-gray-500">
                  + Aggiungi
                </button>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aree di Competenza (Tags AI)</label>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm flex items-center">
                  {tag}
                  {isEditing && <button className="ml-2 text-gray-400 hover:text-red-500">×</button>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden border-l-4 border-l-[#0077B6]">
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50/30">
          <h3 className="text-lg font-bold text-[#1B2A4A] flex items-center">
            <Target size={20} className="mr-2 text-[#0077B6]" />
            Regole AI Personalizzate
          </h3>
        </div>
        <div className="p-6">
           <ul className="space-y-3">
             {profile.customRules.map((rule, idx) => (
               <li key={idx} className="flex items-start group">
                 <CheckCircle2 size={18} className="mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                 <span className={`text-gray-700 ${isEditing ? 'border-b border-dashed border-gray-300' : ''}`}>{rule}</span>
               </li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;