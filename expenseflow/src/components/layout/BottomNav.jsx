import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, PieChart, User } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Home' },
  { path: '/history', icon: History, label: 'History' },
  // Placeholder for FAB spacing
  { path: '#', icon: null, label: '', isSpacer: true },
  { path: '/analytics', icon: PieChart, label: 'Stats' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 px-6 py-2 pb-safe z-40">
      <nav className="flex justify-between items-center relative">
        {navItems.map((item, idx) => (
          item.isSpacer ? (
            <div key="spacer" className="w-12 h-12" />
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(
                "flex flex-col items-center justify-center gap-1 w-12 h-12 transition-colors",
                isActive 
                  ? "text-primary dark:text-teal-400" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              <item.icon size={24} className={clsx("transition-transform")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          )
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
