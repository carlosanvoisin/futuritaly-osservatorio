import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Ciao! Sono l\'assistente strategico di FuturItaly. Posso aiutarti a cercare bandi, analizzare requisiti complessi o confrontare opportunità. Come posso esserti utile oggi?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Contextual AI response logic
    setTimeout(() => {
      let responseText = "Mi dispiace, non ho capito la richiesta. Prova a chiedermi di 'bandi PNRR', 'incentivi clienti', 'confronto bandi' o 'formazione'.";
      const lowerInput = userMsg.text.toLowerCase();
      
      if (lowerInput.includes('consulenza') || lowerInput.includes('servizi') || lowerInput.includes('mimit')) {
        responseText = "Ho trovato il bando MIMIT per 'Servizi di supporto specialistico' con un AI Score del 92%. È un'opportunità strategica che richiede il coinvolgimento di Claudia Bugno per la supervisione istituzionale. Vuoi che prepari una bozza dei requisiti?";
      } 
      else if (lowerInput.includes('confronta')) {
        responseText = "Analisi comparativa: Il bando Comune di Milano richiede una garanzia del 2% ma offre 1.2M€ per attività di foresight. Il bando MIMIT è più accessibile (450k€) e ha una scadenza più ravvicinata. Consiglio il MIMIT se la priorità è la velocità di aggiudicazione.";
      } 
      else if (lowerInput.includes('pnrr')) {
        responseText = "Attualmente sto monitorando 3 bandi PNRR specifici per la digitalizzazione e l'inclusione, tra cui il bando 'Digitalizzazione PMI Lazio' (Intermediary) che è a sportello. Consiglio di attivare Paolo Passaro per una circolare urgente ai clienti.";
      }
      else if (lowerInput.includes('clienti') || lowerInput.includes('intermediary') || lowerInput.includes('incentivi')) {
        responseText = "Per i tuoi clienti SME ho identificato 3 opportunità principali: il Voucher Innovation Manager (dove FuturItaly agisce come fornitore), il bando Digitalizzazione Lazio e il FRI Turismo (solo per clienti hotellerie > 50 dipendenti).";
      }
      else if (lowerInput.includes('formazione') || lowerInput.includes('asl')) {
        responseText = "Il bando ASL Roma 1 per la formazione manageriale è aperto. È una procedura snella sotto soglia. Claudia Bugno può fornire rapidamente i CV dei docenti richiesti.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mx-2 ${
                msg.sender === 'user' ? 'bg-[#2E5090] text-white' : 'bg-[#1B2A4A] text-[#00B4D8]'
              }`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#2E5090] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-2 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none ml-12 shadow-sm">
               <div className="flex space-x-2">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
            placeholder="Chiedi all'AI (es. bandi PNRR, incentivi clienti...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 p-1.5 bg-[#1B2A4A] text-white rounded-md hover:bg-[#2E5090] transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          L'Assistente AI può commettere errori. Verifica sempre i documenti ufficiali di gara.
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;