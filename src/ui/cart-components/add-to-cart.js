'use client';

import Link from 'next/link';
import { useState } from 'react';

import { AnimatePresence } from 'motion/react';
import { useCart } from '@/src/contexts/cart-context';

import ItemCarted from '@/src/ui/cart-components/item-carted';
import WishlistButton from '@/src/ui/wishlist/wishlist-button';
import ModalWindow from '@/src/ui/cart-components/modal-window';
import QuantitySelector from '@/src/ui/cart-components/quantity-selector';

function AddToCart({ inStock, item, user, session, isWishlisted }) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [count, setCount] = useState(1);
   const { cart, setCart } = useCart();

   const cartIDs = cart?.map((item) => item.itemId);

   function handleAdd() {
      if (cartIDs.includes(item.id)) return;

      setCart?.((el) => [
         ...el,
         {
            itemId: item.id,
            cartQuantity: count,
            total: item.price * count,
            orderTotal: null,
         },
      ]);

      setIsOpenModal(true);
   }

   return (
      <div className="flex flex-col">
         <div className="flex justify-between mt-8 mb-8 xs:mb-12 xs:flex-col xs:gap-6 xs:mt-4">
            <QuantitySelector
               inStock={inStock}
               count={count}
               setCount={setCount}
               currentItemId={item.id}
               currentItem={item}
               cartIDs={cartIDs}
            />

            {session ? (
               <WishlistButton
                  userId={user.id}
                  itemId={item.id}
                  isWishlisted={isWishlisted}
               />
            ) : (
               <Link
                  href={'/account/wishlist'}
                  className="self-end xs:self-start xs:order-first border-2 border-primary-500 rounded-md text-xl 2xl:text-lg md:text-xl xs:text-2xl xs:py-1.5 xs:px-5 md:px-6 md:py-2 px-4 py-1 flex items-center gap-2 hover:bg-primary-100 transition-custom"
               >
                  <strong>Sign in</strong>to wishlist
               </Link>
            )}
         </div>

         <button
            onClick={handleAdd}
            className={`bg-primary-50 border-2 border-primary-500 rounded-md px-6 py-3 text-xl 2xl:text-lg lg:text-xl md:text-2xl xs:text-xl 2xl:py-2 xs:py-3 lg:py-3 uppercase font-semibold text-primary-900 hover:text-primary-50 hover:bg-primary-900 transition-custom hover:border-primary-900 w-full xs:mt-[-1.6rem] ${
               !inStock ? 'pointer-events-none opacity-50' : ''
            } ${cartIDs.includes(item.id) && 'opacity-50 pointer-events-none'}`}
         >
            {cartIDs.includes(item.id) ? 'In Cart' : 'Add to Cart'}
         </button>

         <AnimatePresence>
            {isOpenModal && (
               <ModalWindow onClose={() => setIsOpenModal(false)}>
                  <ItemCarted
                     onClose={() => setIsOpenModal(false)}
                     currentItem={item}
                  />
               </ModalWindow>
            )}
         </AnimatePresence>
      </div>
   );
}

export default AddToCart;
