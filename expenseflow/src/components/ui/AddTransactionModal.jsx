import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Coffee, Home, Car, Zap, Heart, Monitor, DollarSign } from 'lucide-react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { clsx } from 'clsx';

const categories = [
  { id: 'Food', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20' },
  { id: 'Shopping', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  { id: 'Housing', icon: Home, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  { id: 'Transport', icon: Car, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/20' },
  { id: 'Utilities', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
  { id: 'Health', icon: Heart, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-500/20' },
  { id: 'Entertainment', icon: Monitor, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-500/20' },
  { id: 'Salary', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/20' },
];

const AddTransactionModal = ({ isOpen, onClose }) => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  
  const [type, setType] = useState('debit');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');

  useEffect(() => {
    if (isOpen) {
      setType('debit');
      setAmount('');
      setCategory(categories[0].id);
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
      setPaymentMethod('Card');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    addTransaction({
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString(),
      note,
      paymentMethod
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Transaction</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-700 rounded-full">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Type Toggle */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
              <button
                type="button"
                onClick={() => setType('debit')}
                className={clsx(
                  "flex-1 py-2 text-sm font-semibold rounded-lg transition-all",
                  type === 'debit' ? "bg-white dark:bg-slate-600 text-debit shadow-sm" : "text-slate-500 dark:text-slate-400"
                )}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType('credit')}
                className={clsx(
                  "flex-1 py-2 text-sm font-semibold rounded-lg transition-all",
                  type === 'credit' ? "bg-white dark:bg-slate-600 text-credit shadow-sm" : "text-slate-500 dark:text-slate-400"
                )}
              >
                Income
              </button>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full pl-12 pr-4 py-4 text-3xl font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Category Grid */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Category</label>
              <div className="grid grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={clsx(
                      "flex flex-col items-center gap-2 p-2 rounded-xl transition-all border-2",
                      category === cat.id 
                        ? "border-primary bg-primary/5 dark:bg-primary/10" 
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-700"
                    )}
                  >
                    <div className={clsx("p-3 rounded-full", cat.bg, cat.color)}>
                      <cat.icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{cat.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank">Bank</option>
                  <option value="Card">Card</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Note</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What was this for?"
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className={clsx(
                "w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-[0.98]",
                type === 'credit' ? "bg-credit shadow-credit/30 hover:bg-green-600" : "bg-debit shadow-debit/30 hover:bg-red-600"
              )}
            >
              Save Transaction
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddTransactionModal;
