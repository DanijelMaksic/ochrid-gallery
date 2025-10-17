'use client';

import { motion } from 'motion/react';
import SortBy from '@/src/ui/operations/sort-by';

function SortOperations() {
   return (
      <motion.div
         className="flex items-center flex-nowrap"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <span className="text-lg 2xl:text-base lg:text-xl px-3 py-1.5 2xl:py-1 lg:py-[0.40rem] border-2 border-primary-300  bg-primary-50  font-semibold rounded-md transition-custom border-r-0 rounded-r-none pointer-events-none text-nowrap">
            Sort By:
         </span>

         <SortBy
            sortField="sort"
            options={[
               { value: 'created_at-asc', label: 'Date (latest)' },
               { value: 'created_at-desc', label: 'Date (oldest)' },
               { value: 'name-asc', label: 'Name (A-Z)' },
               { value: 'name-desc', label: 'Name (Z-A)' },
               { value: 'price-asc', label: 'Price (Low- High)' },
               { value: 'price-desc', label: 'Price (High - Low)' },
               {
                  value: 'sales-desc',
                  label: 'Most Popular',
               },
            ]}
         />
      </motion.div>
   );
}

export default SortOperations;
