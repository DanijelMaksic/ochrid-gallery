'use client';

import { motion } from 'motion/react';

import Summary from '@/src/ui/cart-components/summary';
import FormRow from '@/src/ui/checkout-components/form-row';
import BillingForm from '@/src/ui/checkout-components/billing-form';
import SelectCountry from '@/src/ui/checkout-components/select-country';

function Billing({ session, countries, addresses }) {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="grid grid-cols-[1fr_38rem] 2xl:grid-cols-[1fr_30rem] lg:grid-cols-1"
      >
         <BillingForm session={session} addresses={addresses}>
            <FormRow label="Country">
               <SelectCountry
                  name="country"
                  id="country"
                  countries={countries}
                  className="border-2 border-primary-400 cursor-pointer rounded-md px-3 py-1.5 focus-style transition-custom no-spinners 2xl:text-lg 2xl:py-1 w-full"
               />
            </FormRow>
         </BillingForm>
         <Summary type="billing" />
      </motion.div>
   );
}

export default Billing;
