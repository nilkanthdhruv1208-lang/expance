import Card from './Card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const StatCard = ({ title, amount, type = 'balance', trend }) => {
  const isCredit = type === 'credit';
  const isDebit = type === 'debit';
  
  const Icon = type === 'balance' ? Wallet : isCredit ? TrendingUp : TrendingDown;
  const colorClass = isCredit ? 'text-credit' : isDebit ? 'text-debit' : 'text-primary dark:text-teal-400';
  const bgClass = isCredit ? 'bg-green-100 dark:bg-green-500/20' : isDebit ? 'bg-red-100 dark:bg-red-500/20' : 'bg-teal-100 dark:bg-teal-500/20';

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="font-bold text-3xl text-slate-900 dark:text-white tracking-tight">
            {formatCurrency(amount)}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-medium ${trend >= 0 ? 'text-credit' : 'text-debit'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-slate-500 dark:text-slate-400 ml-2">vs last month</span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
