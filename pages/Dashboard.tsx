import React from 'react';
import { MOCK_TENDERS, PIE_DATA, SCORE_DISTRIBUTION } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, Clock, CheckCircle, AlertOctagon } from 'lucide-react';
import TenderCard from '../components/TenderCard';
import { Page, Tender, Grant } from '../types';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onOpenModal: (type: 'tender' | 'grant' | 'analysis', data: Tender | Grant) => void;
  showToast: (msg: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenModal, showToast }) => {
  const highPriorityTenders = MOCK_TENDERS.filter(t => t.aiScore > 80).slice(0, 3);

  const handleCardClick = (filter: string) => {
    showToast(`Filtro "${filter}" applicato alla lista.`);
    onNavigate(Page.TENDERS);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">Dashboard Operativa</h1>
        <p className="text-gray-500">Panoramica in tempo reale delle opportunità monitorate per FuturItaly.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          onClick={() => handleCardClick('Attivi')}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#1B2A4A] cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">Bandi Attivi</p>
              <h3 className="text-3xl font-bold text-[#1B2A4A] mt-1">143</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-[#1B2A4A]">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 font-medium">+5 nelle ultime 24h</p>
        </div>

        <div 
          onClick={() => handleCardClick('High Score')}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#2E8B57] cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">High Match (&gt;70%)</p>
              <h3 className="text-3xl font-bold text-[#1B2A4A] mt-1">9</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-[#2E8B57]">
              <CheckCircle size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Su 143 totali</p>
        </div>

        <div 
          onClick={() => handleCardClick('In Scadenza')}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#D4A017] cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">In Scadenza (7gg)</p>
              <h3 className="text-3xl font-bold text-[#1B2A4A] mt-1">3</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-[#D4A017]">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-xs text-amber-600 mt-2 font-medium">Azione richiesta</p>
        </div>

        <div 
          onClick={() => handleCardClick('Esclusi')}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#C0392B] cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">Esclusi da AI</p>
              <h3 className="text-3xl font-bold text-[#1B2A4A] mt-1">87</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-[#C0392B]">
              <AlertOctagon size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Out of scope (works, supplies)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1B2A4A]">Priorità Rilevate da AI</h2>
            <button 
              onClick={() => onNavigate(Page.TENDERS)}
              className="text-sm text-[#0077B6] font-medium hover:underline hover:text-[#0096c7]"
            >
              Vedi tutti i bandi
            </button>
          </div>
          
          <div className="space-y-4">
            {highPriorityTenders.map(tender => (
              <TenderCard 
                key={tender.id} 
                tender={tender} 
                onViewDetails={(t) => onOpenModal('tender', t)}
                onAnalyze={(t) => onOpenModal('analysis', t)}
              />
            ))}
          </div>
        </div>

        {/* Side Charts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">Distribuzione Fonti</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {PIE_DATA.map((entry) => (
                <div key={entry.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-gray-600">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">Qualità Opportunità (AI Score)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SCORE_DISTRIBUTION}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {SCORE_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;