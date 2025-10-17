'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import CartTableRow from '@/src/ui/cart-components/cart-table-row';

function CartTable({ cart, setCart, items, type, setIsOpenModal }) {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const mediaQueryMobile = window.matchMedia('(max-width: 450px)');

      setIsMobile(mediaQueryMobile.matches);
   }, [setIsMobile]);

   if (type === 'modify')
      return (
         <div className="2xl-reverse:mx-auto mx-32 xl:mx-16 md:mx-8 sm:mx-6 xs:pt-12 xs:pb-10 pt-10 2xl:pt-8 pb-20 flex flex-col max-w-350">
            <div className="flex justify-between items-center mb-8 xs:mb-4">
               <h2 className="text-4xl 2xl:text-3xl font-semibold">
                  Shopping Cart
               </h2>

               <button
                  onClick={() => setIsOpenModal(true)}
                  className="text-primary-800 text-lg 2xl:text-base uppercase px-4 py-1 border-2 border-primary-300 hover:bg-primary-50 rounded-md transition-custom"
               >
                  {!isMobile ? 'Clear Cart' : 'Clear'}
               </button>
            </div>

            <span className="border-b-2 border-primary-200"></span>

            {cart?.map((item) => (
               <CartTableRow
                  cartData={item}
                  key={item.itemId}
                  items={items}
                  cart={cart}
                  setCart={setCart}
                  type={type}
               />
            ))}
         </div>
      );

   if (type === 'readOnly')
      return (
         <div className="mx-auto xl:mx-14 md:mx-8 sm:mx-6 xs:pt-12 xs:pb-10 pt-10 2xl:pt-8 pb-10 flex flex-col max-w-350">
            <div className="flex justify-between items-center mb-8 xs:mb-4">
               <h2 className="text-4xl 2xl:text-3xl font-semibold">
                  Review Cart
               </h2>

               <Link
                  href={'/payment-method'}
                  className="text-lg 2xl:text-base md:text-lg uppercase underlined-text"
               >
                  &larr; Back{!isMobile && ' to Payment Method'}
               </Link>
            </div>

            <span className="border-b-2 border-primary-200"></span>

            {cart?.map((item) => (
               <CartTableRow
                  cartData={item}
                  key={item.itemId}
                  items={items}
                  cart={cart}
                  setCart={setCart}
                  type={type}
               />
            ))}
         </div>
      );
}

export default CartTable;
