'use client';

import { createContext, useContext, useState } from 'react';

const CartDisabledContext = createContext();

function CartDisabledProvider({ children }) {
   const [isCartDisabled, setIsCartDisabled] = useState(false);

   return (
      <CartDisabledContext.Provider
         value={{
            isCartDisabled,
            setIsCartDisabled,
         }}
      >
         {children}
      </CartDisabledContext.Provider>
   );
}

function useCartDisabled() {
   const context = useContext(CartDisabledContext);
   if (context === undefined)
      throw new Error(
         'CartDisabledContext was used outside of CartDisabledContext.Provider',
      );
   return context;
}

export { CartDisabledProvider, useCartDisabled };
