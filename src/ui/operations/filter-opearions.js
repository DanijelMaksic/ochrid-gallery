'use client';

import { motion } from 'motion/react';
import Filter from '@/src/ui/operations/filter';

function FilterOperations() {
   return (
      <motion.div
         className="flex items-center"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <span className="text-lg 2xl:text-base lg:text-lg px-3 py-1.5 2xl:py-1 border-2 border-primary-300 bg-primary-50  font-semibold rounded-md transition-custom border-r-0 rounded-r-none pointer-events-none text-nowrap">
            Out of Stock:
         </span>

         <Filter
            filterField={'show'}
            options={[
               { value: 'all', label: 'Show' },
               { value: 'in-stock', label: 'Hide' },
            ]}
         />
      </motion.div>
   );
}

export default FilterOperations;
