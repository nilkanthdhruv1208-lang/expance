import { useTransactionStore } from '../store/useTransactionStore';
import Card from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';

const Analytics = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const [period, setPeriod] = useState('month'); // week, month, year

  const chartData = useMemo(() => {
    // Simplified grouping by month for demonstration
    const groups = {};
    transactions.forEach(t => {
      const month = format(parseISO(t.date), 'MMM yyyy');
      if (!groups[month]) groups[month] = { name: month, Income: 0, Expense: 0 };
      
      if (t.type === 'credit') groups[month].Income += t.amount;
      else groups[month].Expense += t.amount;
    });
    
    return Object.values(groups).reverse();
  }, [transactions]);

  const topCategories = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'debit');
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return (
    <div className="space-y-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        
        <select 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </header>

      <Card>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Income vs Expense</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="Income" fill="#22C55E" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Expense" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Spending Categories</h3>
        <div className="space-y-6">
          {topCategories.length > 0 ? topCategories.map(cat => (
            <div key={cat.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{cat.amount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-1000" style={{ width: `${cat.percentage}%` }}></div>
              </div>
              <p className="text-right text-xs text-slate-500 mt-1">{cat.percentage.toFixed(1)}%</p>
            </div>
          )) : (
            <p className="text-center text-slate-500">No expense data available</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
