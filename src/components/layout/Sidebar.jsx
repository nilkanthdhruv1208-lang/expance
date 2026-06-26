import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, PieChart, User, Plus, Wallet } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/analytics', icon: PieChart, label: 'Analytics' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const Sidebar = ({ onAddClick }) => {
  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg text-white">
          <Wallet size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">ExpenseFlow</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => twMerge(
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                isActive 
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-400" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white"
              )
            )}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <button
          onClick={onAddClick}
          className="w-full bg-primary hover:bg-teal-700 text-white flex items-center justify-center gap-2 py-3 rounded-xl transition-colors font-medium shadow-md shadow-teal-500/20"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
