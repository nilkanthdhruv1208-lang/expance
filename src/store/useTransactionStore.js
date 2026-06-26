import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialTransactions = [
  {
    id: '1',
    type: 'credit',
    amount: 50000,
    category: 'Salary',
    date: new Date().toISOString(),
    note: 'March Salary',
    paymentMethod: 'Bank'
  },
  {
    id: '2',
    type: 'debit',
    amount: 1500,
    category: 'Food',
    date: new Date().toISOString(),
    note: 'Groceries',
    paymentMethod: 'Card'
  }
];

export const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: initialTransactions,
      addTransaction: (transaction) => set((state) => ({ 
        transactions: [transaction, ...state.transactions] 
      })),
      editTransaction: (updatedTransaction) => set((state) => ({
        transactions: state.transactions.map(t => 
          t.id === updatedTransaction.id ? updatedTransaction : t
        )
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),
    }),
    {
      name: 'expenseflow-transactions',
    }
  )
);
