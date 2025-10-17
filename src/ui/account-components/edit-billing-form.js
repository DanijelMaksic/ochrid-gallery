import { useActionState } from 'react';

import { motion } from 'motion/react';
import { CgSpinner } from 'react-icons/cg';
import { editAddressAction } from '@/src/lib/actions';

import FormRow from '@/src/ui/checkout-components/form-row';

function EditBillingForm({ children, address, onClose }) {
   const {
      billing_name,
      billing_address,
      billing_city,
      billing_post_code,
      billing_phone,
      id,
   } = address;

   const [state, action, isPending] = useActionState(editAddressAction, {
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
         className="bg-primary-0 text-primary-900 overflow-hidden text-xl flex flex-col transition-custom rounded-lg px-16 py-8 sm:px-10 xs:px-8"
      >
         <FormRow
            label="Full Name"
            type="update"
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
               defaultValue={billing_name}
               className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom text-xl 2xl:text-lg"
            />
         </FormRow>

         <FormRow
            label="Address"
            type="update"
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
               defaultValue={billing_address}
               className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg"
            />
         </FormRow>

         <div className="flex items-center gap-11 xs:flex-col xs:gap-0 xs:self-start">
            <FormRow
               label="City"
               type="update"
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
                  defaultValue={billing_city}
                  className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg"
               />
            </FormRow>

            <FormRow
               label="Post Code"
               type="update"
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
                  defaultValue={billing_post_code}
                  className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg"
               />
            </FormRow>
         </div>

         {children}

         <FormRow
            label="Phone"
            type="update"
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
               defaultValue={billing_phone}
               className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom no-spinners 2xl:text-lg xs:w-77"
            />
         </FormRow>

         <input type="hidden" value={id} name="id" />

         <button
            type="submit"
            className={`bg-primary-900 text-primary-50 px-8 2xl:px-6 py-3 2xl:py-2 rounded-md hover:bg-primary-800 transition-text flex items-center gap-2 w-min text-2xl 2xl:text-xl mt-6 2xl:mt-4 self-end ${
               isPending ? 'opacity-60 pointer-events-none' : 'px-8 py-3'
            }`}
         >
            {isPending ? (
               <>
                  <CgSpinner className="rotate size-7 2xl:size-7 xs:size-6" />
                  <span>Editing</span>
               </>
            ) : (
               <span>Edit</span>
            )}
         </button>
      </form>
   );
}

export default EditBillingForm;
