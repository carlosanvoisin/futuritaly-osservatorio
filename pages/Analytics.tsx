import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { Calendar } from 'lucide-react';

const initialDataTrend = [
  { name: 'Sett 1', bandi: 24, vinti: 2 },
  { name: 'Sett 2', bandi: 35, vinti: 3 },
  { name: 'Sett 3', bandi: 28, vinti: 1 },
  { name: 'Sett 4', bandi: 45, vinti: 5 },
  { name: 'Sett 5', bandi: 32, vinti: 3 },
  { name: 'Oggi', bandi: 40, vinti: 4 },
];

const dataFunnel = [
  { name: 'Monitoreati', value: 143 },
  { name: 'In Target', value: 42 },
  { name: 'High Score', value: 9 },
  { name: 'In Progress', value: 4 },
];

interface AnalyticsProps {
  showToast: (msg: string) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ showToast }) => {
  const [timeRange, setTimeRange] = useState('30gg');
  const [dataTrend, setDataTrend] = useState(initialDataTrend);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    setTimeRange(range);
    showToast(`Analisi aggiornata: ${range}`);
    
    // Simulate data change
    if (range === '90gg') {
      setDataTrend(prev => prev.map(item => ({...item, bandi: item.bandi * 1.5, vinti: item.vinti * 2})));
    } else {
      setDataTrend(initialDataTrend);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2A4A]">Analytics & Reportistica</h1>
          <p className="text-gray-500">Analisi delle performance e trend di mercato.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
          <Calendar size={16} className="text-gray-500" />
          <select 
            value={timeRange}
            onChange={handleRangeChange}
            className="text-sm font-medium text-gray-700 bg-transparent border-none focus:ring-0 cursor-pointer"
          >
            <option value="30gg">Ultimi 30 giorni</option>
            <option value="90gg">Ultimi 3 mesi</option>
            <option value="12m">Ultimo anno</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Trend Opportunità</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataTrend}>
                <defs>
                  <linearGradient id="colorBandi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B2A4A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1B2A4A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVinti" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0077B6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0077B6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="bandi" stroke="#1B2A4A" fillOpacity={1} fill="url(#colorBandi)" name="Nuovi Bandi" animationDuration={1000} />
                <Area type="monotone" dataKey="vinti" stroke="#0077B6" fillOpacity={1} fill="url(#colorVinti)" name="Bandi Selezionati" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Conversion Funnel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataFunnel}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="#2E5090" radius={[0, 4, 4, 0]} barSize={30} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-[#1B2A4A] mb-6">Mappa Copertura Geografica (Heatmap)</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center border border-dashed border-gray-300 relative group cursor-crosshair">
          <p className="text-gray-500 italic group-hover:opacity-0 transition-opacity">Visualizzazione mappa interattiva</p>
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-gray-50/50">
             <button className="px-4 py-2 bg-white shadow rounded border text-sm font-medium text-gray-700">Espandi Mappa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;