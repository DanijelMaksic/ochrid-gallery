'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/src/hooks/use-local-storage';

const FavAddressContext = createContext();

function FavAddressProvider({ children }) {
   const [favAddress, setFavAddress] = useLocalStorage({}, 'favAddress');

   return (
      <FavAddressContext.Provider value={{ favAddress, setFavAddress }}>
         {children}
      </FavAddressContext.Provider>
   );
}

function useFavAddress() {
   const context = useContext(FavAddressContext);
   if (context === undefined)
      throw new Error(
         'FavAddressContext was used outside of FavAddressContext.Provider'
      );
   return context;
}

export { FavAddressProvider, useFavAddress };
