'use client';

import { motion } from 'motion/react';
import { useOrder } from '@/src/contexts/order-context';
import ChosenPaymentMethod from '@/src/ui/checkout-components/chosen-payment-method';

function BillingDetails() {
   const { order } = useOrder();

   const { full_name, address, city, post_code, country, phone, note } = order;

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="flex flex-col justify-center items-center"
      >
         <div className="mx-auto pb-12 2xl:mx-0 2xl:px-12 lg:px-0 md:px-8 xs:px-6 flex flex-col gap-8 w-full max-w-230">
            <h2 className="text-4xl 2xl:text-3xl font-semibold">
               Billing details
            </h2>

            <div className="flex xs:flex-col gap-12 2xl:gap-8 text-xl 2xl:text-lg border-2 border-primary-400 rounded-md px-12 2xl:px-10 py-6 2xl:py-5">
               <div className="flex flex-col gap-2 2xl:gap-0.5 w-full">
                  <span className="font-semibold">{full_name}</span>
                  <span>{address}</span>
                  <div className="flex gap-4">
                     <span>{city}</span>
                     <span>{post_code}</span>
                  </div>
               </div>

               <div className="flex flex-col gap-2 w-full">
                  <span>{country}</span>
                  <span>+{phone}</span>
               </div>

               <span className="italic w-full">
                  {!note?.length ? 'No note specified' : note}
               </span>
            </div>
         </div>

         <ChosenPaymentMethod />
      </motion.div>
   );
}

export default BillingDetails;
