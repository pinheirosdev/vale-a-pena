import { useState, useEffect } from 'react';
import { HistoryItem } from '../types';

const STORAGE_KEY = 'quanto_custa_real_history';
const MAX_HISTORY = 10;

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => {
      const newHistory = [item, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
};
