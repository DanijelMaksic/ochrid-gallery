'use client';

import { format } from 'date-fns';
import { formatCurrency } from '@/src/utils/helpers';

import OrderedItem from '@/src/ui/account-components/ordered-item';

function PastOrder({ order, items }) {
   const {
      full_name,
      order_date,
      order_id,
      address,
      phone,
      email,
      city,
      post_code,
      country,
      note,
      cart,
   } = order;

   const cartParsed = JSON.parse(cart);

   const orderTotal = cartParsed[0].orderTotal;

   return (
      <div className="flex flex-col border-2 border-primary-500 px-12 2xl:px-10 md:px-6 2xl:py-5 md:py-4 xs:px-7 xs:py-5 py-6 text-xl rounded-md 2xl:text-lg">
         <div className="flex justify-between border-b-2 border-primary-200 pb-4 2xl:pb-3 xs:flex-col">
            <div className="flex flex-col gap-1 2xl:gap-0.5 sm:gap-0">
               <span className="font-semibold">Order ID: #{order_id}</span>

               <span className="text-primary-800">
                  Date: {format(order_date, 'MMM d, yyyy')} at{' '}
                  {format(order_date, 'HH:mm a')}
               </span>
            </div>

            <div className="flex flex-col gap-1 2xl:gap-0.5 xs:flex-row xs:gap-2">
               <span>Order Total:</span>
               <span className="font-semibold self-end">
                  {formatCurrency(orderTotal)}
               </span>
            </div>
         </div>

         <div className="grid grid-cols-3 sm:grid-cols-1 gap-3 2xl:gap-2 py-5 2xl:py-4">
            <div className="flex flex-col gap-1 2xl:gap-0.5 sm:gap-0">
               <span className="font-semibold">{full_name}</span>
               <span>+{phone}</span>
               <span>{email}</span>
            </div>

            <div className="flex flex-col gap-1 2xl:gap-0.5 sm:gap-0">
               <span>{address}</span>
               <div className="flex gap-3 items-center">
                  <span>{city}</span>
                  <span>{post_code}</span>
               </div>
               <span>{country}</span>
            </div>

            <div className="flex flex-col gap-1 2xl:gap-0.5 sm:gap-0">
               {!note.length ? (
                  <span className="italic">No note specified</span>
               ) : (
                  <span>{note}</span>
               )}
            </div>
         </div>

         <div className="border-t-2 border-primary-200 pt-4 grid grid-cols-4 2xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6 2xl:gap-4">
            {cartParsed.map((item) => (
               <OrderedItem items={items} item={item} key={item.itemId} />
            ))}
         </div>
      </div>
   );
}

export default PastOrder;
