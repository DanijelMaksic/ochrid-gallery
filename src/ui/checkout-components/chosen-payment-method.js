'use client';

import { motion } from 'motion/react';
import { FaMoneyBill } from 'react-icons/fa';
import { useOrder } from '@/src/contexts/order-context';
import { BsCreditCard2FrontFill } from 'react-icons/bs';

function ChosenPaymentMethod() {
   const { order } = useOrder();

   if (order.payment_method === 'card')
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="self-start 2xl-reverse:self-center px-46 2xl:px-26 xl:px-12 lg:px-30 md:px-8  pb-20 flex flex-col"
         >
            <h2 className="text-4xl 2xl:text-3xl font-semibold mb-8">
               Payment method
            </h2>

            <div className="flex items-center gap-6 justify-center px-6 py-3 border-2 border-primary-500 rounded-md w-fit">
               <BsCreditCard2FrontFill className="text-5xl" />

               <div className="flex flex-col items-center">
                  <h3 className="text-2xl 2xl:text-xl font-semibold">
                     Debit card
                  </h3>
                  <span className="text-xl 2xl:text-lg">Online checkout</span>
               </div>
            </div>
         </motion.div>
      );

   if (order.payment_method === 'cash')
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="self-start 2xl-reverse:self-center px-46 2xl:px-26 xl:px-12 lg:px-30 md:px-8 pb-20 flex flex-col"
         >
            <h2 className="text-4xl 2xl:text-3xl font-semibold mb-8">
               Payment method
            </h2>

            <div className="flex items-center gap-6 justify-center px-6 py-3 border-2 border-primary-500 rounded-md w-fit">
               <FaMoneyBill className="text-5xl" />

               <div className="flex flex-col items-center">
                  <h3 className="text-2xl 2xl:text-xl font-semibold">Cash</h3>
                  <span className="text-xl 2xl:text-lg">Pay at arrival</span>
               </div>
            </div>
         </motion.div>
      );
}

export default ChosenPaymentMethod;
