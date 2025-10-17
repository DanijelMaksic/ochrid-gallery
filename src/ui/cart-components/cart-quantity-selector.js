'use client';

import { LuMinus, LuPlus } from 'react-icons/lu';

function CartQuantitySelector({ cart, cartData, currentItem, setCart, type }) {
   const cartQuantity = cartData.cartQuantity;
   const total = cartData.total;

   function handleDecrement() {
      const decrementedQuantity = cart?.map((item) => {
         if (item.itemId === currentItem.id) {
            return {
               ...item,
               cartQuantity: cartQuantity - 1,
               total: total - currentItem.price,
            };
         } else {
            return item;
         }
      });

      setCart(decrementedQuantity);
   }

   function handleIncrement() {
      const incrementedQuantity = cart?.map((item) => {
         if (item.itemId === currentItem.id) {
            return {
               ...item,
               cartQuantity: cartQuantity + 1,
               total: total + currentItem.price,
            };
         } else {
            return item;
         }
      });

      setCart(incrementedQuantity);
   }

   if (type === 'modify')
      return (
         <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
               {cartQuantity <= 1 ? (
                  <button
                     aria-label="Decrease Quanitity Button"
                     className="bg-primary-100 text-xl 2xl:text-lg rounded-md p-2 hover:bg-primary-200 transition-custom opacity-50 pointer-events-none"
                  >
                     <LuMinus />
                  </button>
               ) : (
                  <button
                     aria-label="Decrease Quanitity Button"
                     className="bg-primary-100 text-xl 2xl:text-lg rounded-md p-2 hover:bg-primary-200 transition-custom"
                     onClick={handleDecrement}
                  >
                     <LuMinus />
                  </button>
               )}

               <span className="bg-primary-100 text-2xl 2xl:text-xl rounded-md py-1.5 w-11 2xl:w-10 text-center">
                  {cartQuantity}
               </span>

               {cartQuantity === currentItem.quantity ? (
                  <button
                     aria-label="Increase Quanitity Button"
                     className="bg-primary-100 text-xl 2xl:text-lg rounded-md p-2 hover:bg-primary-200 transition-custom opacity-50 pointer-events-none"
                  >
                     <LuPlus />
                  </button>
               ) : (
                  <button
                     aria-label="Increase Quanitity Button"
                     className="bg-primary-100 text-xl 2xl:text-lg rounded-md p-2 hover:bg-primary-200 transition-custom"
                     onClick={handleIncrement}
                  >
                     <LuPlus />
                  </button>
               )}
            </div>
         </div>
      );

   if (type === 'readOnly')
      return <span className="text-2xl 2xl:text-xl">{cartQuantity}</span>;
}

export default CartQuantitySelector;
