import { formatCurrency } from './helpers';

describe('formatCurrency', () => {
   // happy path
   it('formats a standard number', () => {
      expect(formatCurrency(1999)).toBe('$1,999.00');
   });
   // edge cases
   it('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
   });
   it('handles negative values', () => {
      expect(formatCurrency(-500)).toBe('-$500.00');
   });
   it('handles decimal values', () => {
      expect(formatCurrency(19.99)).toBe('$19.99');
   });
   it('handles large numbers with comma separators', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
   });

   // unhappy path
   it('handles null', () => {
      expect(formatCurrency(null)).toBe('$0.00'); // null coerces to 0
   });
   it('handles NaN', () => {
      expect(formatCurrency(NaN)).toBe('$NaN');
   });
   it('handles undefined', () => {
      expect(formatCurrency(undefined)).toBe('$NaN');
   });
   it('handles empty string', () => {
      expect(formatCurrency('')).toBe('$0.00');
   });
});
