import React from 'react';
import { Grant } from '../types';
import { Calendar, Euro, Target, CheckCircle2, XCircle, Tag, Clock, MapPin, Briefcase, UserCheck } from 'lucide-react';

interface GrantCardProps {
  grant: Grant;
  onViewDetails?: (grant: Grant) => void;
}

const GrantCard: React.FC<GrantCardProps> = ({ grant, onViewDetails }) => {
  const scoreColor = grant.aiScore >= 70 ? 'text-[#2E8B57]' : 'text-[#D4A017]';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow relative group">
      {/* Perspective Badge */}
      <div className="mb-3 flex">
        {grant.grantPerspective === 'supplier' ? (
          <div className="inline-flex items-center px-2 py-1 rounded bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold">
            <Briefcase size={12} className="mr-1.5" />
            FuturItaly = Supplier
          </div>
        ) : (
          <div className="inline-flex items-center px-2 py-1 rounded bg-green-100 border border-green-200 text-green-800 text-xs font-bold">
            <UserCheck size={12} className="mr-1.5" />
            Opportunity for SME Clients
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
              grant.scope === 'Europeo' ? 'bg-[#0077B6]' : 
              grant.scope === 'Nazionale' ? 'bg-[#1B2A4A]' : 'bg-[#D4A017]'
            }`}>
              {grant.scope.toUpperCase()}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 flex items-center">
              <Clock size={10} className="mr-1"/> {grant.submissionMode}
            </span>
          </div>
           <h3 className="text-lg font-bold text-[#1B2A4A] cursor-pointer hover:text-[#0077B6] leading-tight" onClick={() => onViewDetails?.(grant)}>
             {grant.title}
           </h3>
           <p className="text-xs text-gray-500 mt-1 flex items-center">
             <MapPin size={10} className="mr-1"/> {grant.issuingBody}
           </p>
        </div>
        <div className="flex flex-col items-end ml-4">
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
            <span className="text-xs text-gray-500 uppercase font-bold">Match</span>
            <span className={`font-bold ${scoreColor}`}>{grant.aiScore}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 mt-4 bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
         <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Dotazione</p>
            <p className="font-semibold text-gray-800 text-sm">€ {grant.totalAllocation.toLocaleString('it-IT')}</p>
         </div>
         <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Max Contributo</p>
            <p className="font-semibold text-gray-800 text-sm">{grant.maxContribution}</p>
         </div>
         <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Investimento</p>
            <p className="font-semibold text-gray-800 text-sm">
               {grant.minInvestment ? `> € ${grant.minInvestment.toLocaleString()}` : 'Nessun min.'}
            </p>
         </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {grant.sectors.map((sector, i) => (
             <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium border border-blue-100">
               {sector}
             </span>
          ))}
          {grant.allowedCompanySizes.map((size, i) => (
             <span key={`size-${i}`} className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-medium border border-green-100">
               {size}
             </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 italic pl-2 border-l-2 border-blue-300 line-clamp-2">
          "{grant.operationalSummary}"
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
        <span className={grant.submissionMode === 'A sportello' ? 'text-amber-600 font-medium' : ''}>
           {grant.submissionMode === 'A sportello' ? '⚠️ Fino ad esaurimento risorse' : `Scadenza: ${new Date(grant.deadline!).toLocaleDateString('it-IT')}`}
        </span>
        <button 
          onClick={() => onViewDetails?.(grant)}
          className="text-[#0077B6] font-semibold hover:underline"
        >
          Scheda Completa →
        </button>
      </div>
    </div>
  );
};

export default GrantCard;