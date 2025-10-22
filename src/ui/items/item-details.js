'use client';

import { motion } from 'motion/react';
import { EB_Garamond } from 'next/font/google';
import { formatCurrency } from '@/src/utils/helpers';

import ItemImage from '@/src/ui/items/item-image';
import ReviewWrapper from '@/src/ui/reviews/review-wrapper';
import AddToCart from '@/src/ui/cart-components/add-to-cart';

const garamond = EB_Garamond({
   subsets: ['latin'],
   display: 'swap',
   weight: '500',
});

function ItemDetails({ item, session, reviews, orders, user, isWishlisted }) {
   const { image, name, price, in_stock, id } = item;

   const filteredItems = reviews.filter((review) => review.item_id === id);

   return (
      <motion.div
         className="flex flex-col items-center gap-20 2xl:gap-12 lg:gap-24 lg:self-center"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
      >
         <div className="grid grid-cols-[1.2fr_1fr] gap-16 2xl:gap-12 lg:grid-cols-1 xs:gap-4">
            <ItemImage name={name} image={image} />

            <div className="flex flex-col transition-text justify-between max-w-130 lg:gap-4 md:gap-8 sm:mx-4 xs:mx-6 xs:gap-0">
               <div className="flex flex-col gap-6">
                  <h2
                     className={`${
                        name.length > 40
                           ? `text-4xl 2xl:text-4xl lg:text-4xl xs:text-3xl leading-[1.2] ${garamond.className}`
                           : `text-5xl 2xl:text-5xl  lg:text-4xl xs:text-4xl leading-[1.2] ${garamond.className}`
                     }`}
                  >
                     {name}
                  </h2>

                  <div className="flex items-center md:flex-row md:items-center">
                     <span className="text-5xl 2xl:text-4xl xs:text-4xl border-r-2 border-primary-400 pr-6">
                        {formatCurrency(price)}
                     </span>

                     <span
                        className={
                           in_stock === true
                              ? 'bg-in_stock text-in_stock_text uppercase text-lg lg:text-xl md:text-2xl xs:text-lg font-semibold lg:py-2 w-max rounded-full lg:px-6 xs:px-4 xs:py-1 px-4 py-1 transition-custom ml-6 text-nowrap'
                              : 'bg-sold_out uppercase text-lg lg:text-xl md:text-2xl xs:text-lg lg:px-6 xs:px-4 xs:py-1 lg:py-2 font-semibold w-max rounded-full px-4 py-1 text-sold_out_text transition-custom ml-6 text-nowrap'
                        }
                     >
                        {in_stock ? 'In stock' : 'Sold out'}
                     </span>
                  </div>
               </div>

               <AddToCart
                  user={user}
                  inStock={in_stock}
                  item={item}
                  session={session}
                  isWishlisted={isWishlisted}
               />
            </div>
         </div>

         <div className="flex flex-col gap-6 lg:mx-2 xs:mx-2 w-8/12 max-w-4xl lg:w-full md:w-10/12">
            <h2 className="font-semibold text-4xl mb-2 2xl:text-3xl xs:text-4xl">
               Buyer reviews
            </h2>

            <ReviewWrapper
               reviews={reviews}
               session={session}
               id={id}
               orders={orders}
               filteredItems={filteredItems}
            />
         </div>
      </motion.div>
   );
}

export default ItemDetails;
