'use client';

import { motion } from 'motion/react';

function FormRow({ label, children, type, error }) {
   return (
      <div
         className={`flex flex-col gap-2 2xl:gap-0.5 xs:gap-0 ${
            type === 'update' ? 'px-1' : 'px-6'
         } py-2 xs:py-1 transition-custom`}
      >
         <div className="flex items-center justify-between gap-3">
            <label
               htmlFor={children.props.id}
               className="transition-text text-2xl 2xl:text-xl text-nowrap"
            >
               {label}
               {error && (
                  <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.1 }}
                     className="text-[#CA3A3E] transition-text"
                  >
                     *
                  </motion.span>
               )}
            </label>
            {error}
         </div>

         {children}
      </div>
   );
}

export default FormRow;
