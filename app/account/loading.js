'use client';

import { motion } from 'motion/react';
import { CgSpinner } from 'react-icons/cg';

function Loading() {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <CgSpinner className="rotate flex w-full items-center justify-center text-7xl mt-36 mb-36 xs:mt-64 xs:mb-64" />
      </motion.div>
   );
}

export default Loading;
