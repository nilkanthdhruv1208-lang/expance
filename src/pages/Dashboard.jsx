import { useTransactionStore } from '../store/useTransactionStore';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import TransactionItem from '../components/ui/TransactionItem';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useMemo } from 'react';
import { format, subDays } from 'date-fns';

const Dashboard = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const { totalBalance, totalCredit, totalDebit } = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'credit') {
        acc.totalCredit += curr.amount;
        acc.totalBalance += curr.amount;
      } else {
        acc.totalDebit += curr.amount;
        acc.totalBalance -= curr.amount;
      }
      return acc;
    }, { totalBalance: 0, totalCredit: 0, totalDebit: 0 });
  }, [transactions]);

  const recentTransactions = transactions.slice(0, 5);

  // Mock data for chart
  const chartData = useMemo(() => {
    const data = [];
    let currentBal = totalBalance;
    for (let i = 0; i < 7; i++) {
      data.unshift({
        date: format(subDays(new Date(), i), 'MMM dd'),
        balance: currentBal
      });
      // Simple mock: just vary the balance slightly for the visual
      currentBal = currentBal * (0.95 + Math.random() * 0.1); 
    }
    return data;
  }, [totalBalance]);

  // Donut chart data
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'debit');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4); // Top 4
  }, [transactions]);

  const COLORS = ['#0F766E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back, here's your financial overview.</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" amount={totalBalance} type="balance" />
        <StatCard title="Total Income" amount={totalCredit} type="credit" trend={12} />
        <StatCard title="Total Expenses" amount={totalDebit} type="debit" trend={-5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Balance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`₹${value.toFixed(0)}`, 'Balance']}
                />
                <Area type="monotone" dataKey="balance" stroke="#0F766E" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Donut Chart */}
        <Card>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Expenses</h3>
          {categoryData.length > 0 ? (
            <div className="h-64 flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {categoryData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-500">
              No expense data yet
            </div>
          )}
        </Card>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
          <button className="text-primary hover:text-teal-700 text-sm font-medium">View All</button>
        </div>
        
        {recentTransactions.length > 0 ? (
          <div>
            {recentTransactions.map(tx => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No transactions yet. Click the + button to add one.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
