import { ShoppingBag, Coffee, Home, Car, Zap, Heart, Monitor, DollarSign } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';

const categoryIcons = {
  Food: { icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20' },
  Shopping: { icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  Housing: { icon: Home, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  Transport: { icon: Car, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/20' },
  Utilities: { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
  Health: { icon: Heart, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-500/20' },
  Entertainment: { icon: Monitor, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-500/20' },
  Salary: { icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/20' },
  Default: { icon: ShoppingBag, color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-700' }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const TransactionItem = ({ transaction, onClick }) => {
  const isCredit = transaction.type === 'credit';
  const cat = categoryIcons[transaction.category] || categoryIcons.Default;
  const Icon = cat.icon;

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow cursor-pointer mb-3"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={clsx("p-3 rounded-full", cat.bg, cat.color)}>
          <Icon size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{transaction.category}</p>
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-2">
            <span>{format(new Date(transaction.date), 'MMM dd, yyyy')}</span>
            <span>•</span>
            <span className="truncate max-w-[100px] sm:max-w-[200px]">{transaction.note || transaction.paymentMethod}</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className={clsx("font-bold text-lg", isCredit ? "text-credit" : "text-slate-900 dark:text-white")}>
          {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
