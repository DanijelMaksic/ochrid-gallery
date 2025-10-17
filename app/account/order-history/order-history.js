'use client';

import { motion } from 'motion/react';
import PastOrder from '@/src/ui/account-components/past-order';

function OrderHistory({ filteredOrders, items }) {
   if (!filteredOrders.length)
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
         >
            <h1 className="text-4xl 2xl:text-3xl font-semibold">
               Your order history
            </h1>

            <div className="px-12 py-10 border-2 border-primary-400 rounded-md flex bg-primary-50 items-center justify-center flex-col gap-3">
               <span className="text-3xl font-semibold">No orders found</span>
               <span className="text-2xl">
                  After an order is completed, it will appear here
               </span>
            </div>
         </motion.div>
      );

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="flex flex-col gap-6"
      >
         <h1 className="text-4xl 2xl:text-3xl font-semibold">
            Your order history
         </h1>

         <main className="flex flex-col gap-6 2xl:gap-5">
            {filteredOrders.map((order) => (
               <PastOrder order={order} key={order.id} items={items} />
            ))}
         </main>
      </motion.div>
   );
}

export default OrderHistory;
