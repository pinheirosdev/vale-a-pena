import { useState, useMemo } from 'react';
import { Product } from '../types';
import { compareProducts } from '../utils/calculator';

const initialProduct = (id: string): Product => ({
  id,
  price: 0,
  quantity: 0,
  unit: 'g',
});

export const useCalculator = () => {
  const [productA, setProductA] = useState<Product>(initialProduct('A'));
  const [productB, setProductB] = useState<Product>(initialProduct('B'));

  const updateProduct = (id: 'A' | 'B', field: keyof Product, value: any) => {
    const setter = id === 'A' ? setProductA : setProductB;
    setter((prev) => ({ ...prev, [field]: value }));
  };

  const result = useMemo(() => {
    if (productA.price > 0 && productA.quantity > 0 && productB.price > 0 && productB.quantity > 0) {
      return compareProducts(productA, productB);
    }
    return null;
  }, [productA, productB]);

  const reset = () => {
    setProductA(initialProduct('A'));
    setProductB(initialProduct('B'));
  };

  return {
    productA,
    productB,
    updateProduct,
    result,
    reset,
  };
};
