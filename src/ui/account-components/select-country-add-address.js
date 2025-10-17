'use client';

import { useState } from 'react';
import { useOutsideClick } from '@/src/utils/use-outside-click';

function SelectCountryAddAddress({ name, id, className, countries }) {
   const [open, setOpen] = useState(false);

   const ref = useOutsideClick(() => setOpen((isOpen) => !isOpen));

   const [value, setValue] = useState('Afghanistan');

   return (
      <>
         <input type="hidden" name={name} id={id} value={value} />

         <div
            className={className}
            onClick={() => setOpen((isOpen) => !isOpen)}
         >
            {value}
         </div>

         {open && (
            <ul
               className="absolute z-10 mt-10 2xl:mt-7.5 xs:mt-7 w-140 2xl:w-132 lg:w-129 xs:w-77 bg-primary-0 rounded-md bg-primary border-2 border-primary-500 shadow-lg overflow-auto cursor-pointer transition-custom max-h-62 2xl:max-h-54 xs:max-h-46"
               ref={ref}
               onClick={() => setOpen(false)}
            >
               {countries.map((item) => (
                  <li
                     className="flex justify-between items-center relative py-1.5 2xl:py-1  pr-4 pl-3 2xl:text-lg  hover:bg-primary-100"
                     key={item.name}
                     onClick={() => {
                        setValue(item.name);
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

export default SelectCountryAddAddress;
