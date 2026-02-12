import React, { useState } from 'react';
import { MOCK_GRANTS } from '../constants';
import GrantCard from '../components/GrantCard';
import { Search, Filter, RefreshCcw, X, Briefcase, UserCheck } from 'lucide-react';
import { Tender, Grant, GrantScope, CompanySize, SubmissionMode } from '../types';

interface GrantSearchProps {
  onOpenModal: (type: 'tender' | 'grant' | 'analysis', data: Tender | Grant) => void;
  showToast: (msg: string) => void;
}

const GrantSearch: React.FC<GrantSearchProps> = ({ onOpenModal, showToast }) => {
  // --- Filter States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [perspective, setPerspective] = useState<'all' | 'supplier' | 'intermediary'>('all');
  
  // 1. Perimetro
  const [selectedScopes, setSelectedScopes] = useState<GrantScope[]>([]);
  
  // 2. Tipologia
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  
  // 3. Dimensioni
  const [selectedSizes, setSelectedSizes] = useState<CompanySize[]>([]);
  
  // 4. Soglie
  const [minInvest, setMinInvest] = useState<string>('');
  const [maxInvest, setMaxInvest] = useState<string>('');
  
  // 5. Modalità
  const [submissionMode, setSubmissionMode] = useState<SubmissionMode | 'Tutti'>('Tutti');
  
  // 6. ATECO
  const [atecoSearch, setAtecoSearch] = useState('');
  
  // 7. Ente
  const [authoritySearch, setAuthoritySearch] = useState('');

  // --- Helpers ---
  const toggleSelection = <T extends string>(item: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // --- Filtering Logic ---
  const filteredGrants = MOCK_GRANTS.filter(g => {
    // Perspective Filter
    const perspectiveMatch = perspective === 'all' || g.grantPerspective === perspective;

    // Basic Text Search
    const textMatch = !searchTerm || 
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.operationalSummary.toLowerCase().includes(searchTerm.toLowerCase());

    // 1. Perimetro
    const scopeMatch = selectedScopes.length === 0 || selectedScopes.includes(g.scope);

    // 2. Tipologia
    const sectorMatch = selectedSectors.length === 0 || g.sectors.some(s => selectedSectors.includes(s));

    // 3. Dimensioni
    const sizeMatch = selectedSizes.length === 0 || g.allowedCompanySizes.some(s => selectedSizes.includes(s));

    // 4. Soglie
    const minVal = minInvest ? parseInt(minInvest) : 0;
    const maxVal = maxInvest ? parseInt(maxInvest) : Infinity;
    const investMatch = (!g.minInvestment || g.minInvestment >= minVal) && 
                        (!g.maxInvestment || g.maxInvestment <= maxVal);

    // 5. Modalità
    const modeMatch = submissionMode === 'Tutti' || g.submissionMode === submissionMode;

    // 6. ATECO
    const atecoMatch = !atecoSearch || g.atecoCodes.some(c => c.includes(atecoSearch) || c === 'Tutti');

    // 7. Ente
    const authMatch = !authoritySearch || g.issuingBody.toLowerCase().includes(authoritySearch.toLowerCase());

    return perspectiveMatch && textMatch && scopeMatch && sectorMatch && sizeMatch && investMatch && modeMatch && atecoMatch && authMatch;
  });

  const applyFilters = () => {
     showToast(`Filtri applicati: ${filteredGrants.length} risultati trovati.`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPerspective('all');
    setSelectedScopes([]);
    setSelectedSectors([]);
    setSelectedSizes([]);
    setMinInvest('');
    setMaxInvest('');
    setSubmissionMode('Tutti');
    setAtecoSearch('');
    setAuthoritySearch('');
    showToast("Filtri resettati.");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* --- Sidebar Filters (Left) --- */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0 p-5 custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-[#1B2A4A] flex items-center">
            <Filter size={18} className="mr-2"/> Filtri Avanzati
          </h2>
          <button onClick={resetFilters} className="text-xs text-gray-500 hover:text-red-500 flex items-center">
            <RefreshCcw size={12} className="mr-1"/> Reset
          </button>
        </div>

        <div className="space-y-6">
          {/* Perspective Toggle (New) */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Prospettiva FuturItaly</label>
             <div className="space-y-2">
               <label className="flex items-center cursor-pointer">
                 <input 
                   type="radio" 
                   name="perspective" 
                   checked={perspective === 'all'} 
                   onChange={() => setPerspective('all')}
                   className="text-[#1B2A4A] focus:ring-[#1B2A4A]"
                 />
                 <span className="ml-2 text-sm text-gray-700">Tutte</span>
               </label>
               <label className="flex items-center cursor-pointer">
                 <input 
                   type="radio" 
                   name="perspective" 
                   checked={perspective === 'supplier'} 
                   onChange={() => setPerspective('supplier')}
                   className="text-blue-600 focus:ring-blue-600"
                 />
                 <span className="ml-2 text-sm text-blue-800 font-medium flex items-center">
                   <Briefcase size={12} className="mr-1" /> Supplier
                 </span>
               </label>
               <label className="flex items-center cursor-pointer">
                 <input 
                   type="radio" 
                   name="perspective" 
                   checked={perspective === 'intermediary'} 
                   onChange={() => setPerspective('intermediary')}
                   className="text-green-600 focus:ring-green-600"
                 />
                 <span className="ml-2 text-sm text-green-800 font-medium flex items-center">
                   <UserCheck size={12} className="mr-1" /> Intermediary
                 </span>
               </label>
             </div>
          </div>

          {/* 1. Perimetro */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">1. Perimetro Geografico</label>
            <div className="space-y-1.5">
              {['Europeo', 'Nazionale', 'Regionale', 'Locale'].map(scope => (
                <label key={scope} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedScopes.includes(scope as GrantScope)}
                    onChange={() => toggleSelection(scope as GrantScope, selectedScopes, setSelectedScopes)}
                    className="rounded text-[#1B2A4A] focus:ring-[#1B2A4A]" 
                  />
                  <span className="text-sm text-gray-700">{scope}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 7. Ente (Moved up as per requirements list similarity) */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ente Erogatore</label>
            <select 
               value={authoritySearch}
               onChange={(e) => setAuthoritySearch(e.target.value)}
               className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-[#1B2A4A] outline-none bg-white"
            >
              <option value="">Tutti gli enti</option>
              <option value="MIMIT">MIMIT</option>
              <option value="Invitalia">Invitalia</option>
              <option value="Regione">Regioni</option>
              <option value="Commissione Europea">Commissione Europea</option>
              <option value="Ministero">Ministeri</option>
            </select>
          </div>

          {/* 2. Tipologia */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">2. Tipologia Attività</label>
            <div className="flex flex-wrap gap-2">
              {['Industria', 'Turismo', 'Commercio', 'Agricoltura', 'Servizi', 'Ricerca'].map(sector => (
                <button
                  key={sector}
                  onClick={() => toggleSelection(sector, selectedSectors, setSelectedSectors)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    selectedSectors.includes(sector)
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Beneficiari/Dimensioni */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">3. Beneficiari (Dimensione)</label>
            <div className="grid grid-cols-2 gap-2">
              {['Micro', 'Piccola', 'Media', 'Grande'].map(size => (
                <label key={size} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedSizes.includes(size as CompanySize)}
                    onChange={() => toggleSelection(size as CompanySize, selectedSizes, setSelectedSizes)}
                    className="rounded text-[#1B2A4A] focus:ring-[#1B2A4A]" 
                  />
                  <span className="text-sm text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Soglie Investimento */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">4. Investimento (€)</label>
            <div className="flex space-x-2">
              <input 
                type="number" 
                placeholder="Min" 
                value={minInvest}
                onChange={(e) => setMinInvest(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-[#1B2A4A] outline-none"
              />
              <input 
                type="number" 
                placeholder="Max" 
                value={maxInvest}
                onChange={(e) => setMaxInvest(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-[#1B2A4A] outline-none"
              />
            </div>
          </div>

          {/* 5. Modalità */}
          <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2">5. Modalità Apertura</label>
             <div className="space-y-1">
               {['Tutti', 'A scadenza', 'A sportello'].map(mode => (
                 <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                   <input 
                     type="radio" 
                     name="submissionMode"
                     checked={submissionMode === mode}
                     onChange={() => setSubmissionMode(mode as any)}
                     className="text-[#1B2A4A] focus:ring-[#1B2A4A]" 
                   />
                   <span className="text-sm text-gray-700">{mode}</span>
                 </label>
               ))}
             </div>
          </div>

          {/* 6. ATECO */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">6. Ricerca ATECO</label>
            <input 
               type="text" 
               placeholder="Es. 72.20, 55.10..." 
               value={atecoSearch}
               onChange={(e) => setAtecoSearch(e.target.value)}
               className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-[#1B2A4A] outline-none"
            />
          </div>

          <button 
            onClick={applyFilters}
            className="w-full py-2 bg-[#1B2A4A] text-white rounded-lg font-medium hover:bg-[#2E5090] transition-colors mt-4"
          >
            Applica Filtri
          </button>
        </div>
      </div>

      {/* --- Results Area (Right) --- */}
      <div className="flex-1 flex flex-col bg-[#F5F7FA] overflow-hidden">
        {/* Top Bar */}
        <div className="p-6 pb-2">
           <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1B2A4A]">Finanza Agevolata</h1>
                <p className="text-gray-500 text-sm">Ricerca avanzata bandi e contributi</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm">
                 <span className="text-gray-500">Risultati: </span>
                 <span className="font-bold text-[#1B2A4A]">{filteredGrants.length}</span>
              </div>
           </div>
           
           <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cerca per parola chiave nel titolo o descrizione..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1B2A4A] outline-none"
              />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
           {filteredGrants.length > 0 ? (
             filteredGrants.map(grant => (
               <GrantCard 
                 key={grant.id} 
                 grant={grant} 
                 onViewDetails={(g) => onOpenModal('grant', g)}
               />
             ))
           ) : (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-lg border border-dashed border-gray-300 mx-1">
                <Filter size={40} className="mb-3 opacity-30" />
                <p className="font-medium">Nessun risultato trovato</p>
                <p className="text-sm mt-1">Prova a modificare i filtri nella barra laterale</p>
                <button 
                  onClick={resetFilters} 
                  className="mt-4 text-[#0077B6] font-semibold hover:underline"
                >
                  Resetta tutti i filtri
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default GrantSearch;