import React from 'react';
import { X, Bot, FileText, CheckCircle2, AlertTriangle, Download } from 'lucide-react';
import { Tender, Grant } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'tender' | 'grant' | 'analysis' | null;
  data: Tender | Grant | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, data }) => {
  if (!isOpen || !data) return null;

  const isTender = (item: any): item is Tender => 'authority' in item;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-start z-10">
          <div>
            <div className={`text-xs font-bold px-2 py-0.5 rounded text-white inline-block mb-2 ${
              type === 'analysis' ? 'bg-purple-600' : 'bg-[#1B2A4A]'
            }`}>
              {type === 'analysis' ? 'AI Analysis Protocol' : isTender(data) ? 'Dettaglio Bando' : 'Dettaglio Incentivo'}
            </div>
            <h2 className="text-xl font-bold text-[#1B2A4A] leading-tight">{data.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {type === 'analysis' ? (
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-start space-x-3">
                <Bot className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-purple-900">Analisi Strategica AI</h3>
                  <p className="text-sm text-purple-800 mt-1">
                    Il motore AI ha analizzato 145 pagine di documentazione tecnica.
                    Ecco la sintesi operativa per FuturItaly.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 flex items-center mb-2">
                    <CheckCircle2 className="text-green-500 mr-2" size={18} /> Punti di Forza
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-6">
                    <li>Requisiti tecnici pienamente soddisfatti dal team attuale.</li>
                    <li>Referenze pregresse nel settore Smart City valutate positivamente.</li>
                    <li>Margine operativo stimato: 22-25%.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 flex items-center mb-2">
                    <AlertTriangle className="text-amber-500 mr-2" size={18} /> Rischi Potenziali
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-6">
                    <li>Penali severe sui ritardi di consegna milestone 2.</li>
                    <li>Richiesta fideiussione bancaria immediata.</li>
                  </ul>
                </div>

                <div>
                   <h4 className="font-bold text-gray-800 mb-2">Piano d'Azione Suggerito</h4>
                   <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 font-mono">
                      1. Scaricare disciplinare tecnico.<br/>
                      2. Contattare partner legale per verifica clausole.<br/>
                      3. Avviare stesura offerta tecnica (Sezione A).
                   </div>
                </div>
              </div>
            </div>
          ) : (
            // Standard Detail View
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase">ID Riferimento</p>
                  <p className="font-mono font-medium">{data.id}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase">Scadenza</p>
                  <p className="font-medium text-red-600">{new Date(data.deadline).toLocaleDateString()}</p>
                </div>
                {isTender(data) && (
                  <>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase">Ente</p>
                      <p className="font-medium">{data.authority}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase">Importo</p>
                      <p className="font-medium">€ {data.value.toLocaleString()}</p>
                    </div>
                  </>
                )}
                {!isTender(data) && (
                   <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                     <p className="text-xs text-gray-500 uppercase">Intensità Aiuto</p>
                     <p className="font-medium text-blue-600">{(data as Grant).aidIntensity}</p>
                   </div>
                )}
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">Descrizione Operativa</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {data.operationalSummary}
                  <br/><br/>
                  Questa opportunità è stata selezionata automaticamente in base al profilo aziendale. 
                  Il match score di <strong className="text-green-600">{data.aiScore}%</strong> indica un'alta probabilità di successo.
                </p>
              </div>

              {isTender(data) && (
                <div>
                   <h4 className="font-bold text-gray-800 mb-2">Requisiti Obbligatori</h4>
                   <div className="flex flex-wrap gap-2">
                      {data.requirements.map((req, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-medium border border-blue-100">
                          {req}
                        </span>
                      ))}
                   </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors">
            Chiudi
          </button>
          {type !== 'analysis' ? (
             <button className="px-4 py-2 bg-[#1B2A4A] text-white font-medium rounded-lg hover:bg-[#2E5090] transition-colors flex items-center shadow-sm">
               <Download size={18} className="mr-2" /> Scarica Bando
             </button>
          ) : (
             <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
               Genera Report PDF
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;