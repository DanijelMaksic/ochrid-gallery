'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { motion } from 'motion/react';
import { FaMoneyBill } from 'react-icons/fa';
import { noteSchema } from '@/src/lib/schema';
import { useOrder } from '@/src/contexts/order-context';
import { BsCreditCard2FrontFill } from 'react-icons/bs';
import { useNoteError } from '@/src/contexts/note-error-context';
import { usePaymentMethod } from '@/src/contexts/payment-method-context';

import FormRow from '@/src/ui/checkout-components/form-row';

function PaymentMethodForm() {
   const [isSmall, setIsSmall] = useState(false);

   const { order, setOrder } = useOrder();
   const { paymentMethod, setPaymentMethod, paymentMethodError } =
      usePaymentMethod();
   const [note, setNote] = useState(order.note || '');
   const { noteError, setNoteError } = useNoteError();

   useEffect(() => {
      const result = noteSchema.safeParse(note);

      if (!result.success) {
         setNoteError(result.error.issues[0].message);
      } else {
         setNoteError(null);
      }

      setOrder({
         ...order,
         payment_method: paymentMethod,
         note: note,
      });
   }, [paymentMethod, note, setNoteError]);

   useEffect(() => {
      const mediaQuerySmall = window.matchMedia('(max-width: 640px)');

      setIsSmall(mediaQuerySmall.matches);
   }, [setIsSmall]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="mx-auto sm:mx-4 pt-10 2xl:pt-8 xs:pt-10 pb-24 lg:pb-10 flex flex-col gap-6 xs:gap-0"
      >
         <div className="flex justify-between items-center">
            <h2 className="font-semibold text-4xl 2xl:text-3xl xs:mb-4">
               Payment method
            </h2>

            <Link
               href={'/billing-info'}
               className="text-lg 2xl:text-base md:text-lg uppercase underlined-text"
            >
               &larr; Back{!isSmall && ' to Billing Info'}
            </Link>
         </div>

         <form
            className={`bg-primary-0 text-primary-900 overflow-hidden text-xl flex flex-col transition-custom px-32 md:px-0 ${
               paymentMethodError && !paymentMethod
                  ? 'mt-[-0.8rem] gap-[0.57rem]'
                  : 'mt-6 gap-6 xs:gap-4'
            }`}
         >
            {paymentMethodError && !paymentMethod && (
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  className="text-[#CA3A3E] 2xl:text-lg"
               >
                  {paymentMethodError}
               </motion.p>
            )}

            <div
               className={`grid grid-cols-2 gap-6 xs:gap-2.5 px-1 ${
                  paymentMethodError && !paymentMethod ? 'mb-[0.9rem]' : ''
               }`}
            >
               <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 transition-custom hover:bg-primary-100 hover:border-primary-800 justify-center px-16 py-3 border-2 border-primary-500 rounded-md ${
                     paymentMethod === 'card' &&
                     'bg-primary-900 text-primary-50 border-primary-900 pointer-events-none'
                  }`}
               >
                  <BsCreditCard2FrontFill className="text-5xl opacity-90" />
                  <span className="text-xl text-nowrap">Debit Card</span>
               </button>

               <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`not-first:flex flex-col items-center gap-2 justify-center px-16 py-3 transition-custom border-2 hover:bg-primary-100 hover:border-primary-800 border-primary-500 rounded-md ${
                     paymentMethod === 'cash' &&
                     'bg-primary-900 text-primary-50 border-primary-900 pointer-events-none'
                  }`}
               >
                  <FaMoneyBill className="text-5xl opacity-90" />

                  <span className="text-xl">Cash</span>
               </button>
            </div>

            <FormRow
               label="Note"
               type="update"
               error={
                  noteError && (
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="text-[#CA3A3E] 2xl:text-lg"
                     >
                        {noteError}
                     </motion.p>
                  )
               }
            >
               <textarea
                  type="text"
                  id="note"
                  name="note"
                  placeholder="Write a note (optional)"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                  className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom no-spinners placeholder:italic"
               />
            </FormRow>
         </form>
      </motion.div>
   );
}

export default PaymentMethodForm;
