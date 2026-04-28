import React from 'react';
import { ComparisonResult } from '../types';
import { formatCurrency } from '../utils/calculator';
import { TrendingDown, Minus } from 'lucide-react';

interface ResultCardProps {
  result: ComparisonResult | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null;

  const isDraw = result.winnerId === 'draw';

  return (
    <div className={`p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center transition-all duration-200 ${
      isDraw 
        ? 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400' 
        : 'bg-amber-500 dark:bg-amber-600 text-white shadow-amber-200 dark:shadow-none'
    }`}>
      {isDraw ? (
        <>
          <Minus className="w-8 h-8 mb-2" />
          <p className="text-xl font-bold uppercase tracking-wide">Empate Tecnico</p>
          <p className="text-sm opacity-80">O preço por unidade é igual.</p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-6 h-6" />
            <p className="text-sm font-medium uppercase tracking-widest opacity-90">Economia de</p>
          </div>
          <p className="text-4xl font-black mb-1">
            {result.differencePercentage.toFixed(1)}%
          </p>
          <p className="text-sm opacity-90 text-center">
            Você economiza {formatCurrency(result.savingsValue)} por cada {result.baseUnitLabel}
          </p>
        </>
      )}
    </div>
  );
};
