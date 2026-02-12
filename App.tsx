import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TenderSearch from './pages/TenderSearch';
import GrantSearch from './pages/GrantSearch';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import AIAssistant from './pages/AIAssistant';
import Notifications from './pages/Notifications';
import Modal from './components/Modal';
import Toast from './components/Toast';
import { Page, Tender, Grant } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'tender' | 'grant' | 'analysis' | null>(null);
  const [modalData, setModalData] = useState<Tender | Grant | null>(null);

  // Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  const openModal = (type: 'tender' | 'grant' | 'analysis', data: Tender | Grant) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalType(null);
      setModalData(null);
    }, 200); // small delay for animation
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD: 
        return <Dashboard 
                  onNavigate={setCurrentPage} 
                  onOpenModal={openModal} 
                  showToast={showToast}
               />;
      case Page.TENDERS: 
        return <TenderSearch 
                  onOpenModal={openModal} 
                  showToast={showToast}
               />;
      case Page.GRANTS: 
        return <GrantSearch 
                  onOpenModal={openModal} 
                  showToast={showToast}
               />;
      case Page.ANALYTICS: 
        return <Analytics showToast={showToast} />;
      case Page.PROFILE: 
        return <Profile showToast={showToast} />;
      case Page.AI_ASSISTANT: 
        return <AIAssistant />;
      case Page.NOTIFICATIONS: 
        return <Notifications showToast={showToast} />;
      default: 
        return <Dashboard 
                  onNavigate={setCurrentPage} 
                  onOpenModal={openModal} 
                  showToast={showToast}
               />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col ml-64">
        <Header 
          onNavigate={setCurrentPage} 
          showToast={showToast} 
        />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        type={modalType} 
        data={modalData} 
      />
      <Toast 
        message={toastMsg} 
        onClose={() => setToastMsg(null)} 
      />
    </div>
  );
};

export default App;