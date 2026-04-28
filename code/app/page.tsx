'use client';

import { ProductInput } from '@/components/ProductInput';
import { ResultCard } from '@/components/ResultCard';
import { HistoryList } from '@/components/HistoryList';
import { useCalculator } from '@/hooks/useCalculator';
import { useHistory } from '@/hooks/useHistory';
import { useTheme } from '@/hooks/useTheme';
import { Save, RefreshCw, Moon, Sun } from 'lucide-react';

export default function Home() {
  const { productA, productB, updateProduct, result, reset } = useCalculator();
  const { history, addToHistory, clearHistory } = useHistory();
  const { theme, toggleTheme } = useTheme();

  const handleSave = () => {
    if (result) {
      addToHistory({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        productA,
        productB,
        result,
      });
    }
  };

  return (
    <main className="min-h-screen pb-12">
      <header className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 p-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="pensativo">🤔</span>
            <h1 className="text-xl font-black tracking-tight text-black dark:text-white">
              Vale a <span className="text-amber-500">Pena?</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              onClick={reset}
              className="p-2 text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              aria-label="Limpar calculadora"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        <div className="min-h-[140px] flex flex-col justify-center">
          {result ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <ResultCard result={result} />
              <button
                onClick={handleSave}
                className="w-full py-3 bg-white dark:bg-neutral-900 border-2 border-amber-500 text-amber-600 dark:text-amber-400 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors"
              >
                <Save className="w-5 h-5" />
                Salvar no Histórico
              </button>
            </div>
          ) : (
            <div className="text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-neutral-800">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Preencha os dados para descobrir o que vale mais a pena.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <ProductInput
            label="Produto A"
            product={productA}
            onUpdate={(field, value) => updateProduct('A', field, value)}
            isWinner={result?.winnerId === 'A'}
          />
          
          <div className="relative flex justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-neutral-800"></div>
            </div>
            <span className="relative bg-gray-50 dark:bg-neutral-950 px-4 text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">OU</span>
          </div>

          <ProductInput
            label="Produto B"
            product={productB}
            onUpdate={(field, value) => updateProduct('B', field, value)}
            isWinner={result?.winnerId === 'B'}
          />
        </div>

        <HistoryList items={history} onClear={clearHistory} />
      </div>

      <footer className="max-w-md mx-auto mt-8 px-4 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-600 leading-relaxed">
          Compare preços por unidade e economize no supermercado.<br/>
          Dados salvos apenas no seu dispositivo.
        </p>
      </footer>
    </main>
  );
}
