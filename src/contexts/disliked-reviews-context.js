'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/src/hooks/use-local-storage';

const DislikedReviewsContext = createContext();

function DislikedReviewsProvider({ children }) {
   const [dislikedReviews, setDislikedReviews] = useLocalStorage(
      [],
      'dislikedReviews'
   );

   return (
      <DislikedReviewsContext.Provider
         value={{ dislikedReviews, setDislikedReviews }}
      >
         {children}
      </DislikedReviewsContext.Provider>
   );
}

function useDislikedReviews() {
   const context = useContext(DislikedReviewsContext);
   if (context === undefined)
      throw new Error(
         'DislikedReviewsContext was used outside of DislikedReviewsContext.Provider'
      );
   return context;
}

export { DislikedReviewsProvider, useDislikedReviews };
