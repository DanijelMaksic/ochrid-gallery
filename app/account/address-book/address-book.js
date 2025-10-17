'use client';

import { motion } from 'motion/react';
import AddAddress from '@/src/ui/account-components/add-address';

function AddressBook({ session, countries, children }) {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="flex flex-col gap-6"
      >
         <h1 className="text-4xl 2xl:text-3xl font-semibold">
            Manage your address book
         </h1>

         <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
            {children}
            <AddAddress countries={countries} session={session} />
         </div>
      </motion.div>
   );
}

export default AddressBook;
