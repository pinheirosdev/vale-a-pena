import React from 'react';
import { HistoryItem } from '../types';
import { formatCurrency } from '../utils/calculator';
import { History, Trash2 } from 'lucide-react';

interface HistoryListProps {
  items: HistoryItem[];
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ items, onClear }) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-400">
          <History className="w-5 h-5" />
          <h2 className="font-bold">Comparações Recentes</h2>
        </div>
        <button 
          onClick={onClear}
          className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm flex items-center justify-between">
            <div className="flex flex-col overflow-hidden mr-2">
              <span className="text-[10px] text-gray-900 dark:text-gray-600 font-black uppercase tracking-tight">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-200 truncate">
                  {item.productA.name || 'Produto A'} vs {item.productB.name || 'Produto B'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-500 font-medium">
                  {formatCurrency(item.productA.price)} e {formatCurrency(item.productB.price)}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`text-sm font-black ${item.result.winnerId === 'draw' ? 'text-gray-500' : 'text-green-700 dark:text-green-500'}`}>
                {item.result.winnerId === 'draw' ? 'Empate' : `-${item.result.differencePercentage.toFixed(0)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
