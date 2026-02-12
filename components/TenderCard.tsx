import React from 'react';
import { Tender } from '../types';
import { MapPin, Calendar, Building2, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface TenderCardProps {
  tender: Tender;
  onViewDetails?: (tender: Tender) => void;
  onAnalyze?: (tender: Tender) => void;
}

const TenderCard: React.FC<TenderCardProps> = ({ tender, onViewDetails, onAnalyze }) => {
  const scoreColor = tender.aiScore >= 70 ? 'text-[#2E8B57]' : tender.aiScore >= 40 ? 'text-[#D4A017]' : 'text-[#C0392B]';
  const scoreBg = tender.aiScore >= 70 ? 'bg-green-50' : tender.aiScore >= 40 ? 'bg-amber-50' : 'bg-red-50';
  const scoreBorder = tender.aiScore >= 70 ? 'border-green-200' : tender.aiScore >= 40 ? 'border-amber-200' : 'border-red-200';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Side Color Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${tender.aiScore >= 70 ? 'bg-[#2E8B57]' : tender.aiScore >= 40 ? 'bg-[#D4A017]' : 'bg-[#C0392B]'}`}></div>

      <div className="flex justify-between items-start mb-4 pl-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${
              tender.source.includes('ANAC') ? 'bg-[#1B2A4A]' : 
              tender.source.includes('TED') ? 'bg-[#0077B6]' : 'bg-teal-600'
            }`}>
              {tender.source}
            </span>
            <span className="text-xs text-gray-400 font-mono">{tender.id}</span>
            {tender.isAboveThreshold && (
              <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded border border-purple-200">
                Sopra Soglia
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#1B2A4A] leading-tight max-w-3xl cursor-pointer hover:text-[#2E5090] transition-colors" onClick={() => onViewDetails?.(tender)}>
            {tender.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center">
            <Building2 size={14} className="mr-1" /> {tender.authority}
          </p>
        </div>

        <div className="text-right">
          <div className={`flex flex-col items-end p-2 rounded-lg border ${scoreBg} ${scoreBorder}`}>
            <span className="text-xs text-gray-600 font-medium uppercase mb-1">AI Match Score</span>
            <span className={`text-2xl font-bold ${scoreColor}`}>{tender.aiScore}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pl-3">
        <div className="p-3 bg-gray-50 rounded border border-gray-100">
          <p className="text-xs text-gray-500 uppercase">Valore</p>
          <p className="font-semibold text-[#1B2A4A]">€ {tender.value.toLocaleString('it-IT')}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded border border-gray-100">
          <p className="text-xs text-gray-500 uppercase">Scadenza</p>
          <p className="font-semibold text-[#1B2A4A] flex items-center">
             <Calendar size={14} className="mr-1.5 text-gray-400" />
             {new Date(tender.deadline).toLocaleDateString('it-IT')}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded border border-gray-100">
          <p className="text-xs text-gray-500 uppercase">Luogo</p>
          <p className="font-semibold text-[#1B2A4A] flex items-center">
            <MapPin size={14} className="mr-1.5 text-gray-400" />
            {tender.location}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded border border-gray-100">
          <p className="text-xs text-gray-500 uppercase">CPV</p>
          <p className="font-semibold text-[#1B2A4A] truncate" title={tender.cpvDescription}>
            {tender.cpv}
          </p>
        </div>
      </div>

      <div className="pl-3 space-y-3">
        {tender.criticalIssues.length > 0 && (
          <div className="flex items-start text-xs text-red-700 bg-red-50 p-2 rounded border border-red-100">
            <AlertTriangle size={14} className="mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Criticità rilevate:</span> {tender.criticalIssues.join(', ')}
            </div>
          </div>
        )}
        
        <div className="flex items-start text-sm text-gray-700 bg-blue-50/50 p-3 rounded border border-blue-100">
          <Info size={16} className="mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-800">Analisi Operativa AI:</span> {tender.operationalSummary}
          </div>
        </div>
      </div>

      <div className="mt-4 pl-3 flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onViewDetails?.(tender)}
          className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
        >
          Dettagli
        </button>
        <button 
          onClick={() => onAnalyze?.(tender)}
          className="px-3 py-1.5 text-sm font-medium text-white bg-[#1B2A4A] hover:bg-[#2E5090] rounded shadow-sm transition-colors"
        >
          Analizza Documenti
        </button>
      </div>
    </div>
  );
};

export default TenderCard;