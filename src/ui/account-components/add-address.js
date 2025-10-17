'use client';

import { useState } from 'react';

import { FaPlus } from 'react-icons/fa';
import { AnimatePresence } from 'motion/react';

import FormRow from '@/src/ui/checkout-components/form-row';
import ModalWindow from '@/src/ui/cart-components/modal-window';
import AddAddressForm from '@/src/ui/account-components/add-address-form';
import SelectCountryAddAddress from '@/src/ui/account-components/select-country-add-address';

function AddAddress({ countries, session }) {
   const [isOpenModal, setIsOpenModal] = useState(false);

   return (
      <>
         <button
            onClick={() => setIsOpenModal(true)}
            className="border-dotted border-2 rounded-md border-primary-700 py-17 hover:bg-primary-50 transition-custom flex items-center justify-center gap-2 flex-col"
         >
            <FaPlus className="text-5xl 2xl:text-4xl text-primary-700" />
            <h2 className="text-3xl 2xl:text-2xl font-semibold text-primary-700">
               Add Address
            </h2>
         </button>

         <AnimatePresence>
            {isOpenModal && (
               <ModalWindow onClose={() => setIsOpenModal(false)}>
                  <AddAddressForm
                     onClose={() => setIsOpenModal(false)}
                     session={session}
                  >
                     <FormRow label="Country">
                        <SelectCountryAddAddress
                           name="country"
                           id="country"
                           countries={countries}
                           className="border-2 border-primary-400 cursor-pointer rounded-md px-3 py-1.5 2xl:py-1 focus-style transition-custom no-spinners 2xl:text-lg"
                        />
                     </FormRow>
                  </AddAddressForm>
               </ModalWindow>
            )}
         </AnimatePresence>
      </>
   );
}

export default AddAddress;
