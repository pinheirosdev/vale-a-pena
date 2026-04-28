import { Product, ComparisonResult, MeasureUnit } from '../types';

const unitToFactor: Record<MeasureUnit, { factor: number; base: string }> = {
  'g': { factor: 1, base: 'g' },
  'kg': { factor: 1000, base: 'g' },
  'ml': { factor: 1, base: 'ml' },
  'L': { factor: 1000, base: 'ml' },
  'un': { factor: 1, base: 'un' },
  'm': { factor: 1, base: 'm' },
};

export const calculatePricePerBaseUnit = (price: number, quantity: number, unit: MeasureUnit): number => {
  if (quantity <= 0 || price <= 0) return 0;
  const normalizationFactor = unitToFactor[unit].factor;
  const totalInBaseUnit = quantity * normalizationFactor;
  return price / totalInBaseUnit;
};

export const getStandardPriceLabel = (price: number, quantity: number, unit: MeasureUnit): string => {
  const priceBase = calculatePricePerBaseUnit(price, quantity, unit);
  if (priceBase === 0) return '';

  const format = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  if (unit === 'g' || unit === 'kg') {
    return `${format(priceBase * 100)} por 100g ou ${format(priceBase * 1000)} por kg`;
  }
  if (unit === 'ml' || unit === 'L') {
    return `${format(priceBase * 1000)} por Litro`;
  }
  return `${format(priceBase)} por unidade`;
};

export const compareProducts = (productA: Product, productB: Product): ComparisonResult => {
  const priceBaseA = calculatePricePerBaseUnit(productA.price, productA.quantity, productA.unit);
  const priceBaseB = calculatePricePerBaseUnit(productB.price, productB.quantity, productB.unit);

  if (priceBaseA === priceBaseB) {
    return {
      winnerId: 'draw',
      differencePercentage: 0,
      pricePerBaseUnitA: priceBaseA,
      pricePerBaseUnitB: priceBaseB,
      baseUnitLabel: unitToFactor[productA.unit].base,
      savingsValue: 0,
    };
  }

  const isAWinner = priceBaseA < priceBaseB;
  const cheaper = isAWinner ? priceBaseA : priceBaseB;
  const expensive = isAWinner ? priceBaseB : priceBaseA;

  const differencePercentage = ((expensive - cheaper) / expensive) * 100;
  const savingsValue = expensive - cheaper;

  return {
    winnerId: isAWinner ? productA.id : productB.id,
    differencePercentage,
    pricePerBaseUnitA: priceBaseA,
    pricePerBaseUnitB: priceBaseB,
    baseUnitLabel: unitToFactor[productA.unit].base,
    savingsValue,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
