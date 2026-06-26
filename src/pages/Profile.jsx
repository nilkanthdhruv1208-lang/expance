import { useThemeStore } from '../store/useThemeStore';
import { useTransactionStore } from '../store/useTransactionStore';
import Card from '../components/ui/Card';
import { Moon, Sun, Download, User as UserIcon, LogOut, Settings, Bell } from 'lucide-react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

const Profile = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const transactions = useTransactionStore((state) => state.transactions);

  const handleExport = () => {
    if (transactions.length === 0) {
      alert("No data to export");
      return;
    }

    const dataToExport = transactions.map(t => ({
      Date: format(new Date(t.date), 'yyyy-MM-dd'),
      Type: t.type.toUpperCase(),
      Category: t.category,
      Amount: t.amount,
      'Payment Method': t.paymentMethod,
      Note: t.note || ''
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    
    // Style logic goes here if using pro features, but basic sheet works too
    XLSX.writeFile(wb, "ExpenseFlow_Report.xlsx");
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
      </header>

      <Card className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary to-teal-800 text-white border-none">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
          <UserIcon size={40} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-teal-100 opacity-90">Premium Member</p>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-2">Settings</h3>
        
        <Card className="!p-0 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
          <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <span className="font-medium text-slate-900 dark:text-white">Dark Mode</span>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <button 
            onClick={handleExport}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg">
                <Download size={20} />
              </div>
              <span className="font-medium text-slate-900 dark:text-white">Export to Excel</span>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <Bell size={20} />
              </div>
              <span className="font-medium text-slate-900 dark:text-white">Notifications</span>
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg">
                <Settings size={20} />
              </div>
              <span className="font-medium text-slate-900 dark:text-white">Account Settings</span>
            </div>
          </button>
        </Card>

        <Card className="!p-0 mt-8 overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left font-medium">
            <LogOut size={20} />
            Logout
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
