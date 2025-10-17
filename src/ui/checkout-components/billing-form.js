'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState, useTransition } from 'react';

import { motion } from 'motion/react';
import { useCart } from '@/src/contexts/cart-context';
import { createOrderAction } from '@/src/lib/actions';
import { useOrder } from '@/src/contexts/order-context';
import { useFavAddress } from '@/src/contexts/fav-address-context';

import FormRow from '@/src/ui/checkout-components/form-row';
import AddressPreview from '@/src/ui/checkout-components/address-preview';

function BillingForm({ children, session, addresses }) {
   const [isMobile, setIsMobile] = useState(false);

   const { favAddress } = useFavAddress();
   const { cart } = useCart();
   const cartString = JSON.stringify(cart);
   const [isPending, startTransition] = useTransition();
   const { order, setOrder } = useOrder();

   const router = useRouter();
   const [state, action] = useActionState(createOrderAction, {
      order,
      errors: {},
   });

   const currentAddresses = addresses.filter(
      (address) => address.billing_email === session.user.email
   );

   async function onSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      startTransition(() => {
         action(formData, order);
      });
   }

   useEffect(() => {
      setOrder(state);
      if (state.errors === undefined) router.push('/payment-method');
   }, [state, setOrder, router]);

   useEffect(() => {
      const mediaQueryMobile = window.matchMedia('(max-width: 450px)');

      setIsMobile(mediaQueryMobile.matches);
   }, [setIsMobile]);

   return (
      <div className="px-32 2xl:px-26 lg:px-32 pt-10 pb-24 2xl:pt-8 lg:pb-10 sm:px-12 xs:pt-12 xs:px-4 flex flex-col gap-6 2xl:gap-3">
         <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-4xl 2xl:text-3xl">
               Billing information
            </h2>

            <Link
               href={'/cart'}
               className="text-lg 2xl:text-base md:text-lg uppercase underlined-text"
            >
               &larr; Back{!isMobile && ' to Cart'}
            </Link>
         </div>

         {addresses.some(
            (address) => address.billing_email === session.user.email
         ) && (
            <>
               <h3 className="text-2xl 2xl:text-xl font-semibold mt-4 2xl:mt-0 text-center xs:px-6 text-nowrap">
                  Choose an address from your{' '}
                  <span className="bg-primary-900 text-primary-50 rounded-md px-2 py-0.5 font-normal">
                     Address Book
                  </span>
               </h3>

               <div
                  className={`${
                     isPending && 'pointer-events-none opacity-50'
                  } ${
                     currentAddresses.length === 1
                        ? 'flex items-center justify-center'
                        : 'grid grid-cols-2 gap-5 2xl:gap-3 2xl:grid-cols-1'
                  }`}
               >
                  {addresses.map(
                     (address) =>
                        address.billing_email === session.user.email && (
                           <AddressPreview key={address.id} address={address} />
                        )
                  )}
               </div>

               {Object.keys(favAddress).length ? null : (
                  <h3 className="text-2xl 2xl:text-xl font-semibold mt-4 2xl:mt-0 text-center">
                     Or use some other address
                  </h3>
               )}
            </>
         )}

         <form
            id="billingInfoForm"
            onSubmit={onSubmit}
            className={`bg-primary-0 text-primary-900 overflow-hidden text-xl flex flex-col transition-custom mx-auto max-w-230 ${
               isPending && 'opacity-50 pointer-events-none'
            }`}
         >
            {/* HIDE BILLING FORM IF SAVED ADDRESS IS SELECTED, OTHERWISE SHOW EMPTY FORM */}
            {Object.keys(favAddress).length ? null : (
               <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
               >
                  {' '}
                  <FormRow
                     label="Full Name"
                     error={
                        state?.errors?.full_name && (
                           <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.1 }}
                              className="text-[#CA3A3E] 2xl:text-lg"
                           >
                              {state?.errors?.full_name[0]}
                           </motion.p>
                        )
                     }
                  >
                     <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        defaultValue={
                           favAddress.billing_name || order.full_name
                        }
                        className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom text-xl 2xl:text-lg w-full min-w-80"
                     />
                  </FormRow>
                  <FormRow
                     label="Address"
                     error={
                        state?.errors?.address && (
                           <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.1 }}
                              className="text-[#CA3A3E] 2xl:text-lg"
                           >
                              {state?.errors?.address[0]}
                           </motion.p>
                        )
                     }
                  >
                     <input
                        type="text"
                        id="address"
                        name="address"
                        defaultValue={
                           favAddress.billing_address || order.address
                        }
                        className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg w-full min-w-80"
                     />
                  </FormRow>
                  <div className="flex items-center xs:flex-col xs:items-start">
                     <FormRow
                        label="City"
                        error={
                           state?.errors?.city && (
                              <motion.p
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 transition={{ duration: 0.1 }}
                                 className="text-[#CA3A3E] 2xl:text-lg"
                              >
                                 {state?.errors?.city[0]}
                              </motion.p>
                           )
                        }
                     >
                        <input
                           type="text"
                           id="city"
                           name="city"
                           defaultValue={favAddress.billing_city || order.city}
                           className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg min-w-30 w-full"
                        />
                     </FormRow>

                     <FormRow
                        label="Post Code"
                        error={
                           state?.errors?.post_code && (
                              <motion.p
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 transition={{ duration: 0.1 }}
                                 className="text-[#CA3A3E] 2xl:text-lg"
                              >
                                 {state?.errors?.post_code[0]}
                              </motion.p>
                           )
                        }
                     >
                        <input
                           type="number"
                           id="post_code"
                           name="post_code"
                           defaultValue={
                              favAddress.billing_post_code || order.post_code
                           }
                           className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg min-w-30 w-full"
                        />
                     </FormRow>
                  </div>
                  {children}
                  <FormRow
                     label="Phone"
                     error={
                        state?.errors?.phone && (
                           <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.1 }}
                              className="text-[#CA3A3E] 2xl:text-lg"
                           >
                              {state?.errors?.phone[0]}
                           </motion.p>
                        )
                     }
                  >
                     <input
                        type="number"
                        id="phone"
                        name="phone"
                        defaultValue={favAddress.billing_phone || order.phone}
                        className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg min-w-80 w-full"
                     />
                  </FormRow>
               </motion.div>
            )}
            {/* HIDDEN FIELDS */}
            <input
               type="hidden"
               value={!order.id ? Math.floor(Math.random() * 100000) : order.id}
               name="id"
            />
            <input type="hidden" value={cartString} name="cart" />
            <input type="hidden" name="email" value={session.user.email} />

            {/* WHEN ADDRESS IS SELECTED, IN THE BACKGROUND FILL THE HIDDEN FORM WITH SELECTED ADDRESS DATA */}
            {!Object.keys(favAddress).length ? null : (
               <>
                  <input
                     type="hidden"
                     name="full_name"
                     value={favAddress.billing_name}
                  />
                  <input
                     type="hidden"
                     name="address"
                     value={favAddress.billing_address}
                  />
                  <input
                     type="hidden"
                     name="city"
                     value={favAddress.billing_city}
                  />
                  <input
                     type="hidden"
                     name="post_code"
                     value={favAddress.billing_post_code}
                  />

                  <input
                     type="hidden"
                     name="country"
                     value={favAddress.billing_country}
                  />

                  <input
                     type="hidden"
                     name="phone"
                     value={favAddress.billing_phone}
                  />
                  <input
                     type="hidden"
                     name="address"
                     value={favAddress.billing_email}
                  />
               </>
            )}
         </form>
      </div>
   );
}

export default BillingForm;
