import React from 'react';
import { Product, MeasureUnit } from '../types';
import { getStandardPriceLabel } from '../utils/calculator';

interface ProductInputProps {
  label: string;
  product: Product;
  onUpdate: (field: keyof Product, value: any) => void;
  isWinner?: boolean;
}

const units: { value: MeasureUnit; label: string }[] = [
  { value: 'g', label: 'Gramas (g)' },
  { value: 'kg', label: 'Quilos (kg)' },
  { value: 'ml', label: 'Mililitros (ml)' },
  { value: 'L', label: 'Litros (L)' },
  { value: 'un', label: 'Unidades' },
  { value: 'm', label: 'Metros (m)' },
];

export const ProductInput: React.FC<ProductInputProps> = ({
  label,
  product,
  onUpdate,
  isWinner,
}) => {
  const standardPrice = getStandardPriceLabel(product.price, product.quantity, product.unit);

  return (
    <div className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
      isWinner 
        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20 shadow-lg scale-[1.02]' 
        : 'border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder={label}
          className="bg-transparent font-bold text-lg text-gray-900 dark:text-gray-100 border-none p-0 focus:ring-0 w-full placeholder:text-gray-400 dark:placeholder:text-gray-600"
          value={product.name || ''}
          onChange={(e) => onUpdate('name', e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-400 mb-1">Preço (R$)</label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0,00"
            className="w-full p-3 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-lg font-medium"
            value={product.price || ''}
            onChange={(e) => onUpdate('price', parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-400 mb-1">Qtd.</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 500"
              className="w-full p-3 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-lg font-medium"
              value={product.quantity || ''}
              onChange={(e) => onUpdate('quantity', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-400 mb-1">Unidade</label>
            <select
              className="w-full p-3 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-lg font-medium appearance-none"
              value={product.unit}
              onChange={(e) => onUpdate('unit', e.target.value as MeasureUnit)}
            >
              {units.map((u) => (
                <option key={u.value} value={u.value} className="dark:bg-neutral-900">
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {standardPrice && (
          <div className="pt-2 border-t border-gray-100 dark:border-neutral-800">
            <p className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-600 tracking-wider">Preço Base</p>
            <p className="text-sm text-gray-800 dark:text-gray-400 font-bold">{standardPrice}</p>
          </div>
        )}
      </div>

      {isWinner && (
        <div className="mt-3 text-center">
          <span className="bg-amber-500 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
            Melhor Opção
          </span>
        </div>
      )}
    </div>
  );
};
