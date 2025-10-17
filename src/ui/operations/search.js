'use client';

import { motion } from 'motion/react';
import { HiSearch } from 'react-icons/hi';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSetParams } from '@/src/hooks/use-set-params';
import useDebounce from '@/src/hooks/use-debounce';

function Search({ field }) {
   const searchParams = useSearchParams();
   const initialQuery = searchParams.get('search') || '';
   const [inputValue, setInputValue] = useState(initialQuery);
   const inputRef = useRef(null);

   const handler = useSetParams();
   const debouncedInput = useDebounce(inputValue, 200);

   // - Update URL param only when debounced input changes
   useEffect(() => {
      handler('search', debouncedInput);
   }, [debouncedInput]); // eslint-disable-line

   return (
      <motion.div
         className="relative"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            ref={inputRef}
            className="bg-primary-0 border-2  border-primary-400 placeholder:transition-custom  rounded-md px-4 py-1.5 2xl:py-1 text-primary-800 transition-custom placeholder:text-primary-500 text-lg 2xl:text-base lg:text-lg focus-style pr-18"
            placeholder={`Search by ${field}`}
         />
         <HiSearch className="absolute top-0 2xl:top-[-0.25rem] lg:top-[-0.15rem] right-0 translate-x-[-40%] translate-y-[40%] text-2xl text-primary-700" />
      </motion.div>
   );
}

export default Search;
