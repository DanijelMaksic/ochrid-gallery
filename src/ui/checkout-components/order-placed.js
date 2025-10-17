'use client';

import { useEffect } from 'react';

import { useCart } from '@/src/contexts/cart-context';
import { useOrder } from '@/src/contexts/order-context';

function OrderPlaced() {
   const { setCart } = useCart();
   const { setOrder } = useOrder();

   useEffect(() => {
      setCart([]);
      setOrder({});
   }, [setCart, setOrder]);

   return (
      <span className="mb-4 2xl:mb-2 text-2xl 2xl:text-xl md:text-2xl">
         Your order was completed successfully.
      </span>
   );
}

export default OrderPlaced;
