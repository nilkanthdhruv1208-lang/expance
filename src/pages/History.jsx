import { useState, useMemo } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import TransactionItem from '../components/ui/TransactionItem';
import { Search, Filter } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';

const History = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all, credit, debit

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.note?.toLowerCase().includes(search.toLowerCase()) || 
                            t.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || t.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  // Group by date
  const grouped = useMemo(() => {
    const groups = {};
    filteredTransactions.forEach(t => {
      const date = new Date(t.date);
      let dateKey = format(date, 'MMM dd, yyyy');
      if (isToday(date)) dateKey = 'Today';
      else if (isYesterday(date)) dateKey = 'Yesterday';
      
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(t);
    });
    return groups;
  }, [filteredTransactions]);

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transaction History</h1>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
          {['all', 'credit', 'debit'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                filter === f 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No transactions found.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, txs]) => (
            <div key={date}>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">{date}</h3>
              <div>
                {txs.map(tx => (
                  <div key={tx.id} className="group relative">
                    <TransactionItem transaction={tx} />
                    {/* Delete button appears on hover for desktop */}
                    <button 
                      onClick={() => deleteTransaction(tx.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
