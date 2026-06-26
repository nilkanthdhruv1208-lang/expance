import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddTransactionModal from '../ui/AddTransactionModal';

const AppLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background dark:bg-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar onAddClick={() => setIsModalOpen(true)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <BottomNav onAddClick={() => setIsModalOpen(true)} />
      </div>

      {/* Mobile FAB (Optional, some prefer it floating over the nav) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary hover:bg-teal-700 text-white rounded-full p-4 shadow-lg shadow-teal-500/30 transition-transform active:scale-95"
      >
        <Plus size={24} />
      </button>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AppLayout;
