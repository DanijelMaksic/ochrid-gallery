'use client';

import Link from 'next/link';
import Image from 'next/image';

import { IoCheckmarkCircleOutline } from 'react-icons/io5';

function ItemCarted({ onClose, currentItem }) {
   const { name, image } = currentItem[0] || currentItem;

   return (
      <div className="flex flex-col gap-8 2xl:gap-4 sm:gap-6 px-12 2xl:px-10 pb-12 2xl:pb-10 pt-8 2xl:pt-6 rounded-lg bg-primary-0 md:w-150 sm:w-110 xs:w-92">
         <h2 className="flex items-center gap-3 text-3xl 2xl:text-2xl md:text-3xl xs:text-2xl font-semibold border-b-2 border-primary-400 pb-6 2xl:pb-3 xs:text-center">
            <IoCheckmarkCircleOutline className="size-8" />
            <span>Product added to cart</span>
         </h2>

         <div className="flex items-center sm:flex-col gap-12 2xl:gap-8 sm:gap-4">
            <div className="relative flex items-center justify-center bg-primary-200 rounded-sm overflow-hidden transition-custom border-2 border-primary-400 h-30 2xl:h-24 w-24 2xl:w-18 md:h-32 md:w-26">
               <Image
                  src={image}
                  alt={name}
                  fill
                  className="opacity-95 object-contain"
               />
            </div>

            <div className="flex flex-col gap-8 2xl:gap-6">
               <h3 className="text-left font-semibold text-2xl 2xl:text-xl md:text-3xl xs:text-2xl sm:text-center">
                  {name.length > 30 ? `${name.slice(0, 31)}...` : name}
               </h3>

               <div className="flex gap-6 2xl:gap-4 text-xl 2xl:text-lg md:text-xl sm:text-2xl sm:flex-col">
                  <button
                     onClick={() => onClose?.()}
                     className="px-6 2xl:px-4 py-2 2xl:py-1.5 md:px-6 md:py-2 rounded-md border-2 border-secondary border-primary-400 hover:bg-primary-100 transition-text"
                  >
                     Continue Shopping
                  </button>

                  <Link
                     href={'/cart'}
                     className="bg-primary-800 px-6 2xl:px-4 py-2 2xl:py-1.5 md:px-6 md:py-2 rounded-md text-primary-50 hover:bg-primary-200 hover:text-primary-900 transition-custom flex items-center gap-1 justify-center"
                  >
                     Go to Cart
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ItemCarted;
