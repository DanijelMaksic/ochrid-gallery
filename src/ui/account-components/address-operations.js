'use client';

import { useState } from 'react';

import { CiStar } from 'react-icons/ci';
import { AnimatePresence } from 'motion/react';
import { TiStarFullOutline } from 'react-icons/ti';
import { deleteAddressAction } from '@/src/lib/actions';
import { useFavAddress } from '@/src/contexts/fav-address-context';

import FormRow from '@/src/ui/checkout-components/form-row';
import ModalWindow from '@/src/ui/cart-components/modal-window';
import DeleteAddress from '@/src/ui/account-components/delete-address';
import EditBillingForm from '@/src/ui/account-components/edit-billing-form';
import SelectCountryEditAddress from '@/src/ui/account-components/select-country-edit-address';

function AddressOperations({ address, countries }) {
   const { favAddress, setFavAddress } = useFavAddress();

   const isFavorite = JSON.stringify(favAddress) === JSON.stringify(address);

   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpenEditModal, setIsOpenEditModal] = useState(false);

   function toggleFavAddress() {
      // If there is NO fav address
      if (!favAddress.length) setFavAddress(address);

      // If current address is faved
      if (isFavorite) setFavAddress({});
   }

   return (
      <div className="flex items-center border-t-2 justify-between border-primary-200 py-2 px-8 2xl:text-lg">
         <div className="flex items-center gap-4">
            <button
               onClick={() => setIsOpenEditModal(true)}
               className="underlined-text"
            >
               Edit
            </button>

            <span>|</span>

            <button
               onClick={() => setIsOpenDeleteModal(true)}
               className="underlined-text"
            >
               Delete
            </button>
         </div>

         <button
            aria-label="Favorite Address Button"
            onClick={toggleFavAddress}
         >
            {!isFavorite && <CiStar className="size-7 2xl:size-6" />}
            {isFavorite && <TiStarFullOutline className="size-7 2xl:size-6" />}
         </button>

         <AnimatePresence>
            {isOpenDeleteModal && (
               <ModalWindow onClose={() => setIsOpenDeleteModal(false)}>
                  <DeleteAddress
                     onClose={() => setIsOpenDeleteModal(false)}
                     onDelete={() => {
                        deleteAddressAction(address.id);
                        if (favAddress.id === address.id) {
                           setFavAddress({});
                        }
                     }}
                  />
               </ModalWindow>
            )}
         </AnimatePresence>

         <AnimatePresence>
            {isOpenEditModal && (
               <ModalWindow onClose={() => setIsOpenEditModal(false)}>
                  <EditBillingForm
                     address={address}
                     onClose={() => setIsOpenEditModal(false)}
                  >
                     <FormRow label="Country" type="update">
                        <SelectCountryEditAddress
                           name="country"
                           id="country"
                           address={address}
                           countries={countries}
                           className="border-2 border-primary-400 cursor-pointer rounded-md px-3 py-2 2xl:py-1 focus-style transition-custom no-spinners 2xl:text-lg"
                        />
                     </FormRow>
                  </EditBillingForm>
               </ModalWindow>
            )}
         </AnimatePresence>
      </div>
   );
}

export default AddressOperations;
