'use client';

import { useState } from 'react';

import { useOrder } from '@/src/contexts/order-context';
import { useOutsideClick } from '@/src/utils/use-outside-click';
import { useFavAddress } from '@/src/contexts/fav-address-context';

function SelectCountry({ name, id, className, countries }) {
   const [openMenu, setOpenMenu] = useState(false);
   const { favAddress } = useFavAddress();
   const { order, setOrder } = useOrder();

   const ref = useOutsideClick(() => setOpenMenu((isOpen) => !isOpen), false);

   const [value, setValue] = useState(
      favAddress.billing_country || 'Afghanistan'
   );

   return (
      <>
         <input type="hidden" name={name} id={id} value={value} />

         <div
            className={className}
            onClick={() => setOpenMenu((isOpen) => !isOpen)}
         >
            {value}
         </div>

         {openMenu && (
            <ul
               className="absolute z-10 mt-10 2xl:mt-7.5 xs:mt-7 w-125.5 2xl:w-124 lg:w-111 md:w-114 sm:w-121.5 xs:w-83 bg-primary-0 rounded-md bg-primary border-2 border-primary-500 shadow-lg overflow-auto cursor-pointer transition-custom max-h-52 2xl:max-h-54 lg:max-h-38"
               ref={ref}
               onClick={() => setOpenMenu(false)}
            >
               {countries.map((item) => (
                  <li
                     className="flex justify-between 2xl:text-lg items-center relative py-1.5 2xl:py-1 pr-4 pl-3 hover:bg-primary-100"
                     key={item.name}
                     onClick={() => {
                        setValue(item.name);
                        setOrder({ ...order, country: item.name });
                     }}
                  >
                     {item.name}
                  </li>
               ))}
            </ul>
         )}
      </>
   );
}

export default SelectCountry;
