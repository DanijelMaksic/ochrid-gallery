'use client';

import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'motion/react';
import { formatCurrency } from '@/src/utils/helpers';
import { Suspense, useEffect, useState } from 'react';

function ItemCard({ item }) {
   const { name, price, image, slug, in_stock } = item;
   const [mounted, setMounted] = useState(false);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => setMounted(true), []);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <Link
            href={`/items/${slug}`}
            className={`flex flex-col border-2 border-primary-400 h-[21.20rem] lg:h-[26rem] xs:h-[25.3rem] rounded-md overflow-hidden hover:opacity-85 transition-all duration-200 ${
               !in_stock && 'opacity-65'
            }`}
         >
            <Suspense
               fallback={
                  <div className="md:order-1 h-[26rem] 2xl:h-[23rem] lg:h-[20rem] xs:h-[20rem]" />
               }
            >
               <div className="relative h-70 2xl:h-60 lg:h-70">
                  <Image
                     src={image}
                     alt={name}
                     fill
                     className={`bg-primary-200 object-contain transition-opacity duration-700 ease-in-out ${
                        loaded ? 'opacity-95' : 'opacity-0'
                     }`}
                     priority={true}
                     quality={60}
                     sizes="100vw"
                     onLoad={() => setLoaded(true)}
                  />
               </div>
            </Suspense>

            <div className="grid grid-rows-[1.7fr_1fr] 2xl:gap-1 px-4 py-3 2xl:py-2 lg:py-3 text-center">
               <h2
                  className={`font-semibold text-primary-900 2xl:leading-5.5 ${
                     name.length > 28
                        ? 'text-sm lg:text-lg'
                        : 'text-lg lg:text-xl'
                  }`}
               >
                  {' '}
                  {name.length > 41 ? `${name.slice(0, 42)}...` : name}
               </h2>

               <span className="text-xl lg:text-2xl font-semibold text-primary-800">
                  {in_stock ? (
                     formatCurrency(price)
                  ) : (
                     <span className="text-red-400  uppercase text-base ">
                        Sold Out
                     </span>
                  )}
               </span>
            </div>
         </Link>
      </motion.div>
   );
}

export default ItemCard;
