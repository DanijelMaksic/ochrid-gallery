'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { motion } from 'motion/react';
import { formatCurrency } from '@/src/utils/helpers';

import RemoveWishlistItem from '@/src/ui/wishlist/remove-wishlist-item';
import WishlistCartButton from '@/src/ui/wishlist/wishlist-cart-button';
import { format } from 'date-fns';

function WishlistItem({ item, dates }) {
   const { image, name, price, in_stock, id } = item;

   const date = dates.find((item) => item.item_id === id);
   const formattedDate = format(date.created_at, 'dd.MM.yyyy');

   const [isLarge, setIsLarge] = useState(false);
   const [isMedium, setIsMedium] = useState(false);

   useEffect(() => {
      const mediaQueryLarge = window.matchMedia('(max-width: 1024px)');
      const mediaQueryMedium = window.matchMedia('(max-width: 768px)');

      setIsLarge(mediaQueryLarge.matches);
      setIsMedium(mediaQueryMedium.matches);
   }, [setIsLarge, setIsMedium]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="relative grid grid-cols-[1fr_3fr_2.5fr] gap-6 xs:gap-3 bg-primary-50 border-2 rounded-md border-primary-500 items-center mb-4 mx-24 2xl:mx-20 lg:mx-0"
      >
         <Link
            href={`/items/${id}`}
            className="relative h-40 2xl:h-36 w-32 2xl:w-30 xs:h-30 xs:w-24"
         >
            <Image
               src={image}
               alt={name}
               fill
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               className="bg-primary-200 object-contain opacity-95 rounded-sm"
            />
         </Link>

         <div className="flex flex-col gap-4 xs:gap-1.5">
            <Link
               href={`/items/${id}`}
               className={`font-semibold text-primary-900 xs:leading-6 underlined-text ${
                  name.length > 28
                     ? 'text-2xl 2xl:text-xl xs:text-lg'
                     : 'text-3xl 2xl:text-2xl xs:text-xl'
               }`}
            >
               {' '}
               {isLarge
                  ? name.length > 28
                     ? `${name.slice(0, 29)}...`
                     : name
                  : name.length > 61
                  ? `${name.slice(0, 62)}...`
                  : name}
            </Link>

            <span
               className={
                  in_stock === true
                     ? 'bg-in_stock text-in_stock_text uppercase font-semibold w-max rounded-full xs:text-sm px-4 py-1 xs:px-3 xs:py-0.5 transition-custom'
                     : 'bg-sold_out uppercase font-semibold xs:text-sm w-max rounded-full px-4 xs:px-3 py-1 xs:py-0.5 text-sold_out_text transition-custom'
               }
            >
               {in_stock ? 'In stock' : 'Sold out'}
            </span>
         </div>

         <div className="flex xs:flex-col gap-4 lg:gap-2 xs:gap-0 items-center bg-primary-300 rounded-md justify-end mr-4 xs:mr-3 ml-auto xs:mb-4">
            {in_stock === true ? (
               <>
                  <span className="text-2xl 2xl:text-xl xs:text-lg pl-5 lg:pl-3 xs:pl-0 font-semibold xs:order-2">
                     {formatCurrency(price)}
                  </span>

                  <WishlistCartButton item={item} />
               </>
            ) : (
               <Link href={`/items/${id}`}>
                  <button className="text-lg 2xl:text-base font-semibold bg-primary-900 text-primary-50 rounded-md py-2 2xl:py-1.5 px-6 2xl:px-5 hover:bg-primary-800 transition-custom tracking-wide">
                     {isMedium ? 'Details' : 'View Details'}
                  </button>
               </Link>
            )}

            <div className="absolute right-5 xs:right-3 bottom-2 text-primary-800">
               Added on {formattedDate} ( <RemoveWishlistItem itemId={id} /> )
            </div>
         </div>
      </motion.div>
   );
}

export default WishlistItem;
