import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, noPadding = false }) => {
  return (
    <div className={twMerge(
      clsx(
        "bg-white dark:bg-slate-800 rounded-xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] border border-slate-100 dark:border-slate-700/50",
        !noPadding && "p-6",
        className
      )
    )}>
      {children}
    </div>
  );
};

export default Card;
