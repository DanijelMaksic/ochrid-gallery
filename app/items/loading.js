'use client';

import { motion } from 'motion/react';

function Loading() {
   return (
      <motion.div
         className="mb-16"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <div className="mt-10 2xl-reverse:mx-auto max-w-220 mb-9 xs:my-4 mx-130 2xl:mx-89 xl:mx-64 lg:mx-55 md:mx-24 sm:mx-44 xs:mx-16">
            <OperationsSkeleton />
         </div>

         <div className="mx-72 2xl-reverse:mx-auto max-w-400 2xl:mx-46 xl:mx-32 md:mx-12 xs:mx-14 grid grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-12 2xl:gap-10 lg:gap-9 md:gap-6 sm:gap-8 xs:pt-4">
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />

            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />

            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
         </div>
      </motion.div>
   );
}

function OperationsSkeleton() {
   return (
      <div className="w-full h-10 2xl:h-8 lg:h-24 md:h-21 sm:h-33 xs:h-39 bg-primary-300 rounded-md animate-skeleton transition-custom"></div>
   );
}

function ItemSkeleton() {
   return (
      <div className="w-full h-94 2xl:h-84 lg:h-103 xs:h-99 bg-primary-400 rounded-md animate-skeleton transition-custom"></div>
   );
}

export default Loading;
