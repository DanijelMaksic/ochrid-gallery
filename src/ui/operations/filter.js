'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter({ filterField, options }) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   function handleFilter(value) {
      const params = new URLSearchParams(searchParams);
      params.set(filterField, value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   const params = new URLSearchParams(searchParams);
   const filterValue = params.get(filterField) || options[0].value;

   return (
      <div className="flex gap-1 text-lg 2xl:text-base lg:text-xl px-1 py-1 bg-primary-0  border-2 border-primary-300 rounded-md transition-custom  rounded-l-none">
         {options.map((option) => (
            <button
               key={option.value}
               onClick={() => handleFilter(option.value)}
               className={`hover:bg-primary-100 px-3 font-semibold py-0.5 2xl:py-0 rounded-md text-primary-900 transition-custom   ${
                  filterValue === option.value &&
                  'bg-primary-100 pointer-events-none'
               }`}
            >
               {option.label}
            </button>
         ))}
      </div>
   );
}

export default Filter;
