'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/src/hooks/use-local-storage';

const CartContext = createContext();

function CartProvider({ children }) {
   const [cart, setCart] = useLocalStorage([], 'cart');

   return (
      <CartContext.Provider value={{ cart, setCart }}>
         {children}
      </CartContext.Provider>
   );
}

function useCart() {
   const context = useContext(CartContext);
   if (context === undefined)
      throw new Error('Context was used outside provider');

   return context;
}

export { CartProvider, useCart };
