'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { placeOrderAction } from '@/src/lib/actions';
import { formatCurrency } from '@/src/utils/helpers';
import { useCart } from '@/src/contexts/cart-context';
import { useOrder } from '@/src/contexts/order-context';
import { useNoteError } from '@/src/contexts/note-error-context';
import { usePaymentMethod } from '@/src/contexts/payment-method-context';

function Summary({ type, session }) {
   const { cart, setCart } = useCart();
   const { order } = useOrder();
   const { noteError } = useNoteError();
   const { paymentMethod, setPaymentMethodError } = usePaymentMethod();
   const router = useRouter();

   const cartTotal = cart?.map((item) => item.total);
   const subtotal = cartTotal?.reduce((a, b) => a + b, 0);
   const shipping = 20;
   const orderTotal = subtotal + shipping;

   function continueToBilling() {
      const newValue = cart?.map((item) => {
         if (item.itemId) {
            return {
               ...item,
               orderTotal: orderTotal,
            };
         } else {
            return item;
         }
      });

      setCart(newValue);
   }

   function continueToReviewOrder() {
      if (!paymentMethod) {
         setPaymentMethodError('You must choose a payment method');
         return;
      }
      if (noteError) return;

      router.push('/review-order');
   }

   if (!cart?.length)
      return (
         <div className="bg-primary-100 px-20 py-10 flex flex-col gap-6"></div>
      );

   return (
      <div className="bg-primary-100 px-32 2xl:px-14 lg:px-62 md:px-32 xs:px-6 xs:py-6 py-10 2xl:py-8 flex flex-col gap-6 xs:gap-3">
         <h2 className="font-semibold border-b-2 border-primary-500 pb-8 text-4xl 2xl:text-3xl xs:pb-4">
            Summary
         </h2>

         <div className="flex flex-col gap-4 2xl:gap-3 text-2xl 2xl:text-xl xs:gap-2">
            <div className="flex items-center justify-between">
               <span>Subtotal</span>
               <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-primary-800">
               <span>Shipping</span>
               <span>{formatCurrency(20)}</span>
            </div>
         </div>

         <div className="flex items-center justify-between text-2xl 2xl:text-xl border-y-2 border-primary-500 py-4 font-semibold">
            <span>Order Total</span>
            <span>{formatCurrency(orderTotal)}</span>
         </div>

         {type === 'cart' && (
            <Link
               href={'/billing-info'}
               onClick={continueToBilling}
               className="py-3 2xl:py-2.5 bg-primary-900 text-primary-100 text-2xl 2xl:text-xl rounded-md hover:bg-primary-800 transition-custom my-4 text-center lg:w-fit lg:px-12 lg:self-end"
            >
               {session ? 'Continue' : 'Sign in to continue'}
            </Link>
         )}

         {type === 'billing' && (
            <button
               type="submit"
               form="billingInfoForm"
               className="py-3 2xl:py-2.5 bg-primary-900 text-primary-100 text-2xl 2xl:text-xl rounded-md hover:bg-primary-800 transition-custom my-6 flex justify-center lg:w-fit lg:px-12 lg:self-end"
            >
               <span>Continue</span>
            </button>
         )}

         {type === 'payment' && (
            <button
               onClick={continueToReviewOrder}
               type="button"
               className="py-3 2xl:py-2.5 bg-primary-900 2xl:text-xl text-primary-100 text-2xl rounded-md hover:bg-primary-800 transition-custom my-6 flex justify-center lg:w-fit lg:px-12 lg:self-end"
            >
               <span>Continue</span>
            </button>
         )}

         {type === 'placeOrder' && (
            <form action={placeOrderAction} className="lg:self-end">
               <button
                  href={'/review-order/thank-you'}
                  className="py-3 2xl:py-2.5 bg-primary-900 text-primary-100 text-2xl 2xl:text-xl w-full rounded-md hover:bg-primary-800 transition-custom my-6 text-center lg:w-fit lg:px-12"
               >
                  Place Order
               </button>

               <input
                  type="hidden"
                  name="orderData"
                  value={JSON.stringify(order)}
               />
            </form>
         )}
      </div>
   );
}

export default Summary;
