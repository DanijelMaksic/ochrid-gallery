'use client';

import Link from 'next/link';
import Image from 'next/image';

import { formatCurrency } from '@/src/utils/helpers';

function OrderedItem({ item, items }) {
   const { itemId, cartQuantity, total } = item;

   const [cartItem] = items.filter((item) => item.id === itemId);

   const { image, name, slug } = cartItem;

   return (
      <div className="flex items-center">
         <Link
            href={`/items/${slug}`}
            className="flex items-center gap-1 border-2 border-primary-400 rounded-md overflow-hidden hover:opacity-85 transition-all duration-200 sm:w-full"
         >
            <div className="relative h-32 2xl:h-28 w-30 2xl:w-24">
               <Image
                  src={image}
                  alt={name}
                  fill
                  className="bg-primary-200 object-contain opacity-95"
               />
            </div>

            <div className="flex gap-2 flex-col px-4 py-3 text-center">
               <h2 className="text-lg font-semibold text-primary-900">
                  {' '}
                  {name.length > 9 ? `${name.slice(0, 10)}...` : name}
               </h2>

               <span className="text-xl font-semibold text-primary-800">
                  {cartQuantity}x = {formatCurrency(total)}
               </span>
            </div>
         </Link>
      </div>
   );
}

export default OrderedItem;
