'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/src/hooks/use-local-storage';

const OrderContext = createContext();

function OrderProvider({ children }) {
   const [order, setOrder] = useLocalStorage({}, 'order');

   return (
      <OrderContext.Provider value={{ order, setOrder }}>
         {children}
      </OrderContext.Provider>
   );
}

function useOrder() {
   const context = useContext(OrderContext);
   if (context === undefined)
      throw new Error('OrderContext was used outside of OrderContext.Provider');
   return context;
}

export { OrderProvider, useOrder };
