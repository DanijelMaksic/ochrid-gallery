'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/src/hooks/use-local-storage';

const LikedReviewsContext = createContext();

function LikedReviewProvider({ children }) {
   const [likedReviews, setLikedReviews] = useLocalStorage([], 'likedReviews');

   return (
      <LikedReviewsContext.Provider value={{ likedReviews, setLikedReviews }}>
         {children}
      </LikedReviewsContext.Provider>
   );
}

function useLikedReviews() {
   const context = useContext(LikedReviewsContext);
   if (context === undefined)
      throw new Error(
         'LikedReviewsContext was used outside of LikedReviewsContext.Provider'
      );
   return context;
}

export { LikedReviewProvider, useLikedReviews };
