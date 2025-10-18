'use client';

import { useActionState } from 'react';

import { motion } from 'motion/react';
import { CgSpinner } from 'react-icons/cg';
import { createAddressAction } from '@/src/lib/actions';

import FormRow from '@/src/ui/checkout-components/form-row';

function AddAddressForm({ children, onClose, session }) {
   const [state, action, isPending] = useActionState(createAddressAction, {
      success: false,
      errors: {},
   });

   if (state.success) {
      onClose?.();
      state.success = false;
   }

   return (
      <form
         action={action}
         className="bg-primary-0 text-primary-900 overflow-hidden text-xl flex flex-col transition-custom rounded-lg px-16 sm:px-4 py-8"
      >
         <FormRow
            label="Full Name"
            error={
               state?.errors?.billing_name && (
                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.1 }}
                     className="text-[#CA3A3E] 2xl:text-lg"
                  >
                     {state?.errors?.billing_name[0]}
                  </motion.p>
               )
            }
         >
            <input
               type="text"
               id="full_name"
               name="full_name"
               className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom text-xl 2xl:text-lg"
            />
         </FormRow>

         <FormRow
            label="Address"
            error={
               state?.errors?.billing_address && (
                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.1 }}
                     className="text-[#CA3A3E] 2xl:text-lg"
                  >
                     {state?.errors?.billing_address[0]}
                  </motion.p>
               )
            }
         >
            <input
               type="text"
               id="address"
               name="address"
               className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg"
            />
         </FormRow>

         <div className="flex items-center gap-2 xs:flex-col xs:self-start xs:gap-0">
            <FormRow
               label="City"
               error={
                  state?.errors?.billing_city && (
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="text-[#CA3A3E] 2xl:text-lg"
                     >
                        {state?.errors?.billing_city[0]}
                     </motion.p>
                  )
               }
            >
               <input
                  type="text"
                  id="city"
                  name="city"
                  className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg"
               />
            </FormRow>

            <FormRow
               label="Post Code"
               error={
                  state?.errors?.billing_post_code && (
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="text-[#CA3A3E] 2xl:text-lg"
                     >
                        {state?.errors?.billing_post_code[0]}
                     </motion.p>
                  )
               }
            >
               <input
                  type="number"
                  id="post_code"
                  name="post_code"
                  className="border-2 border-primary-400  rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg"
               />
            </FormRow>
         </div>

         {children}

         <FormRow
            label="Phone"
            error={
               state?.errors?.billing_phone && (
                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.1 }}
                     className="text-[#CA3A3E] 2xl:text-lg"
                  >
                     {state?.errors?.billing_phone[0]}
                  </motion.p>
               )
            }
         >
            <input
               type="number"
               id="phone"
               name="phone"
               className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg xs:w-77"
            />
         </FormRow>

         <input type="hidden" name="email" value={session.user.email} />
         <input type="hidden" name="user_id" value={session.user.userId} />

         <button
            type="submit"
            className={`bg-primary-900 text-primary-50 rounded-md hover:bg-primary-800 px-8 2xl:px-6 py-3 2xl:py-2 transition-text flex items-center gap-2 w-min text-2xl 2xl:text-xl mt-6 2xl:mt-4 mr-6 self-end ${
               isPending && 'opacity-60 pointer-events-none'
            }`}
         >
            {isPending ? (
               <>
                  <CgSpinner className="size-7.5 rotate 2xl:size-7 xs:size-6" />
                  <span>Adding</span>
               </>
            ) : (
               <span>Add</span>
            )}
         </button>
      </form>
   );
}

export default AddAddressForm;
