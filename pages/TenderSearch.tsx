import React, { useState } from 'react';
import { MOCK_TENDERS } from '../constants';
import TenderCard from '../components/TenderCard';
import { Search, Filter, ChevronDown, RefreshCcw } from 'lucide-react';
import { Tender, Grant } from '../types';

interface TenderSearchProps {
  onOpenModal: (type: 'tender' | 'grant' | 'analysis', data: Tender | Grant) => void;
  showToast: (msg: string) => void;
}

const TenderSearch: React.FC<TenderSearchProps> = ({ onOpenModal, showToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<'score' | 'deadline' | 'value'>('score');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      showToast(`Trovati ${filteredTenders.length} risultati.`);
    }, 600);
  };

  const handleApplyFilters = () => {
    setShowAdvancedFilters(false);
    showToast("Filtri avanzati applicati correttamente.");
  };

  const sortedTenders = [...MOCK_TENDERS].sort((a, b) => {
    if (sortOrder === 'score') return b.aiScore - a.aiScore;
    if (sortOrder === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    if (sortOrder === 'value') return b.value - a.value;
    return 0;
  });

  const filteredTenders = sortedTenders.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.authority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">Cerca Bandi e Gare</h1>
        <p className="text-gray-500">Esplora il database integrato ANAC/PDND, TED Europa e UNGM.</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex-shrink-0 space-y-4 transition-all duration-300">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cerca per parole chiave, CPV o stazione appaltante..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E5090] focus:border-[#2E5090] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-4 py-2 border rounded-md font-medium flex items-center transition-colors ${
              showAdvancedFilters 
                ? 'bg-[#E0E7FF] text-[#2E5090] border-[#2E5090]' 
                : 'bg-[#F5F7FA] border-gray-300 text-[#1B2A4A] hover:bg-gray-100'
            }`}
          >
            <Filter size={18} className="mr-2" /> Filtri Avanzati
          </button>
          <button 
            onClick={handleSearch}
            className="px-4 py-2 bg-[#1B2A4A] text-white rounded-md font-medium hover:bg-[#2E5090] shadow-sm flex items-center min-w-[90px] justify-center"
          >
            {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Cerca'}
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
           <div className="pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* 1. Geographic Scope */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Perimetro Geografico</label>
                  <select className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-[#1B2A4A] bg-white">
                    <option>Qualsiasi</option>
                    <option>Europeo</option>
                    <option>Nazionale</option>
                    <option>Regionale</option>
                    <option>Locale</option>
                    <option>Internazionale</option>
                  </select>
                </div>

                {/* 7. Authority */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ente Erogatore</label>
                  <select className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-[#1B2A4A] bg-white">
                    <option>Tutti</option>
                    <option>Invitalia</option>
                    <option>MIMIT</option>
                    <option>Ministero Turismo</option>
                    <option>Agenzia Coesione</option>
                    <option>AGENAS</option>
                    <option>Commissione Europea</option>
                    <option>Regioni</option>
                    <option>Camere di Commercio</option>
                    <option>UNIDO</option>
                    <option>Altro</option>
                  </select>
                </div>

                {/* 4. Thresholds */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Soglie Economiche (€)</label>
                  <div className="flex space-x-2">
                    <input type="number" placeholder="Minimo" className="w-full text-sm border border-gray-300 rounded px-3 py-1.5" />
                    <input type="number" placeholder="Massimo" className="w-full text-sm border border-gray-300 rounded px-3 py-1.5" />
                  </div>
                </div>

                {/* 2. Sector / Activity */}
                <div className="col-span-2">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Settore / Attività</label>
                   <div className="flex flex-wrap gap-2">
                     {['Industria', 'Turismo', 'Commercio', 'Agrifood', 'Servizi', 'Tech', 'Energy', 'Health', 'Culture', 'Infra'].map(tag => (
                       <label key={tag} className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
                         <input type="checkbox" className="rounded text-[#1B2A4A] focus:ring-[#1B2A4A] w-3 h-3" />
                         <span className="text-xs text-gray-700">{tag}</span>
                       </label>
                     ))}
                   </div>
                </div>

                {/* 3. Company Size */}
                <div className="col-span-2">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Dimensione Impresa</label>
                   <div className="flex gap-4">
                     {['Micro', 'Piccola', 'Media', 'Grande'].map(size => (
                       <label key={size} className="flex items-center space-x-2 cursor-pointer">
                         <input type="checkbox" className="rounded text-[#1B2A4A] focus:ring-[#1B2A4A]" />
                         <span className="text-sm text-gray-700">{size}</span>
                       </label>
                     ))}
                   </div>
                </div>

                {/* 5. Deadline Type */}
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tipo Scadenza</label>
                   <div className="flex flex-col space-y-1">
                     <label className="flex items-center space-x-2">
                       <input type="radio" name="deadline" className="text-[#1B2A4A] focus:ring-[#1B2A4A]" />
                       <span className="text-sm text-gray-700">Data fissa</span>
                     </label>
                     <label className="flex items-center space-x-2">
                       <input type="radio" name="deadline" className="text-[#1B2A4A] focus:ring-[#1B2A4A]" />
                       <span className="text-sm text-gray-700">A sportello</span>
                     </label>
                   </div>
                </div>

                {/* 6. ATECO */}
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Codice ATECO</label>
                   <input type="text" placeholder="Es. 72.20" className="w-full text-sm border border-gray-300 rounded px-3 py-1.5" />
                </div>
             </div>
             
             <div className="mt-6 flex justify-end pt-4 border-t border-gray-100">
               <button 
                 onClick={handleApplyFilters}
                 className="px-6 py-2 bg-[#2E5090] text-white font-medium rounded-lg hover:bg-[#1B2A4A] transition-colors shadow-sm"
               >
                 Applica Filtri
               </button>
             </div>
           </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 font-medium">
             {isSearching ? 'Ricerca in corso...' : `Trovati ${filteredTenders.length} risultati`}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Ordina per:</span>
            <div className="relative group">
              <button className="text-sm font-bold text-[#1B2A4A] flex items-center hover:bg-gray-100 px-2 py-1 rounded">
                {sortOrder === 'score' ? 'Pertinenza AI' : sortOrder === 'deadline' ? 'Scadenza' : 'Valore €'} 
                <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-gray-100 w-32 py-1 hidden group-hover:block z-20">
                <button onClick={() => setSortOrder('score')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-[#1B2A4A]">Pertinenza AI</button>
                <button onClick={() => setSortOrder('deadline')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-[#1B2A4A]">Scadenza</button>
                <button onClick={() => setSortOrder('value')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-[#1B2A4A]">Valore</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTenders.length > 0 ? (
            filteredTenders.map(tender => (
              <TenderCard 
                key={tender.id} 
                tender={tender} 
                onViewDetails={(t) => onOpenModal('tender', t)}
                onAnalyze={(t) => onOpenModal('analysis', t)}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
               <p className="text-gray-500">Nessun bando trovato con i filtri correnti.</p>
               <button 
                 onClick={() => {setSearchTerm(''); setShowAdvancedFilters(false);}}
                 className="mt-2 text-[#0077B6] font-medium hover:underline"
               >
                 Resetta filtri
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenderSearch;