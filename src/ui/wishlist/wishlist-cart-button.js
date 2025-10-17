'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence } from 'motion/react';
import { useCart } from '@/src/contexts/cart-context';

import ItemCarted from '@/src/ui/cart-components/item-carted';
import ModalWindow from '@/src/ui/cart-components/modal-window';

function WishlistCartButton({ item }) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const { cart, setCart } = useCart();
   const cartIDs = cart?.map((item) => item.itemId);

   const [isLarge, setIsLarge] = useState(false);

   useEffect(() => {
      const mediaQueryLarge = window.matchMedia('(max-width: 1024px)');

      setIsLarge(mediaQueryLarge.matches);
   }, [setIsLarge]);

   const currentItemId = item.id;
   const currentItemPrice = item.price;

   function handleAdd() {
      if (cartIDs.includes(item.id)) return;

      setCart?.((item) => [
         ...item,
         {
            itemId: currentItemId,
            cartQuantity: 1,
            total: currentItemPrice,
            orderTotal: null,
         },
      ]);

      setIsOpenModal(true);
   }

   return (
      <>
         <button
            onClick={handleAdd}
            disabled={cartIDs.includes(currentItemId)}
            className={`text-lg 2xl:text-base font-semibold bg-primary-900 text-primary-50 rounded-md py-2 px-6 m-1 xs:mb-0 2xl:px-5 2xl:py-1.5 hover:bg-primary-800 transition-custom tracking-wide xs:order-1  ${
               cartIDs.includes(item.id) && 'opacity-60 pointer-events-none'
            }`}
         >
            {cartIDs.includes(currentItemId)
               ? 'In Cart'
               : isLarge
               ? 'Add'
               : 'Add to Cart'}
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
      </>
   );
}

export default WishlistCartButton;
