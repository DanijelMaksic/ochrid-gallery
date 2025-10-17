'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function FilterReviews() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   function handleFilter(value) {
      const params = new URLSearchParams(searchParams);
      params.set('reviews', value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   const params = new URLSearchParams(searchParams);
   const filterValue = params.get('reviews');

   return (
      <div className="flex items-center">
         <div className="flex gap-1 text-lg 2xl:text-base lg:text-xl md:text-2xl p-1 md:p-1 bg-primary-0 border-2 border-primary-500 rounded-md transition-custom xs:flex-col xs:text-xl">
            <button
               onClick={() => handleFilter('all')}
               className={`hover:bg-primary-100 px-3 font-semibold py-0.5 rounded-md text-primary-900 transition-custom ${
                  filterValue === 'all' && 'bg-primary-100 pointer-events-none'
               } ${
                  filterValue === null && 'bg-primary-100 pointer-events-none'
               }`}
            >
               All
            </button>

            <button
               onClick={() => handleFilter('recommended')}
               className={`hover:bg-primary-100 px-3 font-semibold py-0.5 rounded-md text-primary-900 transition-custom ${
                  filterValue === 'recommended' &&
                  'bg-primary-100 pointer-events-none'
               }`}
            >
               Recommended
            </button>

            <button
               onClick={() => handleFilter('not-recommended')}
               className={`hover:bg-primary-100 px-3 font-semibold py-0.5 rounded-md text-primary-900 transition-custom ${
                  filterValue === 'not-recommended' &&
                  'bg-primary-100 pointer-events-none'
               }`}
            >
               Not recommended
            </button>
         </div>
      </div>
   );
}

export default FilterReviews;
