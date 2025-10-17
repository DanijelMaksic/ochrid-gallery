'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage(initialState, key) {
   const [value, setValue] = useState(function () {
      let storedValue;
      if (typeof window !== 'undefined') {
         storedValue = localStorage?.getItem(key);
      }
      return storedValue ? JSON.parse(storedValue) : initialState;
   });

   useEffect(
      function () {
         localStorage.setItem(key, JSON.stringify(value));
      },
      [value, key]
   );

   return [value, setValue];
}
