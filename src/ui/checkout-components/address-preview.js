'use client';

import { motion, AnimatePresence } from 'motion/react';
import { TiStarFullOutline } from 'react-icons/ti';
import { useFavAddress } from '@/src/contexts/fav-address-context';

function AddressPreview({ address }) {
   const { favAddress, setFavAddress } = useFavAddress();

   const {
      billing_name,
      billing_address,
      billing_city,
      billing_post_code,
      billing_country,
      billing_phone,
   } = address;

   const isFavorite = JSON.stringify(favAddress) === JSON.stringify(address);

   function toggleFavAddress() {
      // If there is NO fav address
      if (!favAddress.length) setFavAddress(address);

      // If current address is faved
      if (isFavorite) setFavAddress({});
   }

   return (
      <button
         type="button"
         onClick={toggleFavAddress}
         className={`relative grid grid-cols-2 gap-6 px-6 mx-auto py-3 border-2 border-primary-500 rounded-md text-left cursor-pointer transition-custom ${
            isFavorite
               ? 'border-primary-800 bg-primary-50'
               : 'hover:bg-primary-50 hover:border-primary-800 '
         }`}
      >
         <div className="flex flex-col gap-0.5 2xl:gap-0 text-xl 2xl:text-lg">
            <span className="font-semibold">{billing_name}</span>
            <span>{billing_address}</span>
            <span>{billing_city}</span>
         </div>

         <div className="flex flex-col gap-0.5 2xl:gap-0 text-xl 2xl:text-lg">
            <span>{billing_post_code}</span>
            <span>{billing_country}</span>
            <span>{billing_phone}</span>
         </div>

         <AnimatePresence>
            {isFavorite && (
               <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-1 right-1"
               >
                  <TiStarFullOutline className="size-7 2xl:size-6" />
               </motion.span>
            )}
         </AnimatePresence>
      </button>
   );
}

export default AddressPreview;
