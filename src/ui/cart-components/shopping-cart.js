'use client';

import { useState } from 'react';
import { useCart } from '@/src/contexts/cart-context';

import { motion, AnimatePresence } from 'motion/react';

import ClearCart from '@/src/ui/cart-components/clear-cart';
import EmptyCart from '@/src/ui/cart-components/empty-cart';
import CartTable from '@/src/ui/cart-components/cart-table';
import ModalWindow from '@/src/ui/cart-components/modal-window';

function ShoppingCart({ items, type }) {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const { cart, setCart } = useCart();

   if (type === 'modify')
      return (
         <div
            role="table"
            className="flex flex-col text-2xl 2xl:text-xl lg:text-2xl"
         >
            {!cart?.length ? (
               <EmptyCart />
            ) : (
               <CartTable
                  cart={cart}
                  setCart={setCart}
                  items={items}
                  setIsOpenModal={setIsOpenModal}
                  type="modify"
               />
            )}

            <AnimatePresence>
               {isOpenModal && (
                  <ModalWindow onClose={() => setIsOpenModal(false)}>
                     <ClearCart
                        onClose={() => setIsOpenModal(false)}
                        setCart={setCart}
                     />
                  </ModalWindow>
               )}
            </AnimatePresence>
         </div>
      );

   if (type === 'readOnly')
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            role="table"
            className="flex flex-col text-2xl 2xl:text-xl"
         >
            <CartTable
               cart={cart}
               setCart={setCart}
               items={items}
               type="readOnly"
            />
         </motion.div>
      );
}

export default ShoppingCart;
