'use client';

import { motion } from 'motion/react';
import { FaImage } from 'react-icons/fa';

function Loading() {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <ItemDetailSkeleton />
      </motion.div>
   );
}

function ItemDetailSkeleton() {
   return (
      <>
         <div className="grid grid-cols-[1.2fr_1fr] gap-16 mx-92 2xl-reverse:mx-auto max-w-280 2xl:mx-62 xl:mx-32 lg:mx-50 md:mx-12 sm:mx-4 xs:mx-6 my-16 2xl:my-10 xs:my-12 2xl:gap-12 lg:gap-14 md:gap-12 lg:grid-cols-1 xs:gap-4">
            <div className="flex items-center justify-center bg-primary-200 rounded-lg overflow-hidden h-132 2xl:h-120 w-full sm:w-149 xs:h-100 xs:w-91 animate-skeleton transition-custom self-center justify-self-center">
               <FaImage className="h-25 w-25 text-primary-500 transition-text" />
            </div>

            <div className="flex flex-col justify-between lg:gap-14 md:gap-18 xs:gap-24">
               <div className="flex flex-col">
                  {/* Title */}
                  <h2 className="h-15 w-full 2xl:h-12 lg:h-10 rounded-lg bg-primary-200 mb-7 lg:mb-5 md:mb-7 transition-custom animate-skeleton"></h2>

                  <div className="flex items-center gap-12 2xl:gap-10">
                     {/* Price */}
                     <span className="w-36 h-12 2xl:w-30 2xl:h-10 bg-primary-200 rounded-lg transition-custom animate-skeleton"></span>

                     {/* Stock Status */}
                     <span className="w-32 h-10 md:h-12 md:w-40 xs:w-32 xs:h-10 bg-primary-200 rounded-full transition-custom animate-skeleton"></span>
                  </div>
               </div>

               <div className="flex flex-col gap-8 lg:gap-6">
                  <div className="flex flex-row  justify-between xs:gap-7">
                     <div className="flex flex-col gap-2">
                        {/* Quantity Label */}
                        <span className="w-24 h-6 2xl:w-20 md:w-28 lg:h-8 bg-primary-200 rounded-lg transition-custom animate-skeleton mb-1"></span>

                        {/* Quantity Selector */}
                        <span className="w-42 h-12 2xl:h-10 2xl:w-36 lg:h-12 lg:w-41 md:w-52 md:h-16 xs:h-12 xs:w-44 bg-primary-200 rounded-lg transition-custom animate-skeleton"></span>
                     </div>

                     {/* Wishlist Button */}
                     <span className="self-end w-42 2xl:w-39 h-10 lg:h-11 lg:w-48 md:w-50 md:h-12 bg-primary-200 rounded-lg transition-custom animate-skeleton"></span>
                  </div>

                  {/* Add to Cart Button */}
                  <span className="w-full h-14 2xl:h-12 lg:h-14 md:h-16 xs:h-13 bg-primary-200 rounded-lg transition-custom animate-skeleton"></span>
               </div>
            </div>
         </div>

         <div className="flex flex-col gap-1 max-w-4xl 2xl-reverse:mx-auto 2xl:gap-0.5 mx-136 mb-16 2xl:mx-106 lg:mx-50 md:mx-12 sm:mx-4">
            {/* Buyer Reviews */}
            <h2 className="h-10 w-52 2xl:w-45 2xl:h-8 mt-4 lg:mt-15 md:mt-14 xs:mt-22 xs:h-10 xs:w-53 rounded-lg bg-primary-200 mb-7 transition-custom animate-skeleton"></h2>

            {/* Reviw block */}

            <span className="w-full h-75 2xl:h-65 lg:h-72 sm:h-75 xs:h-88 bg-primary-200 rounded-lg transition-custom animate-skeleton"></span>
         </div>
      </>
   );
}

export default Loading;
