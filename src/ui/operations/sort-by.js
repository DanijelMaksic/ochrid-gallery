'use client';

import Select from '@/src/ui/operations/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SortBy({ sortField, options }) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   function handleSort(e) {
      const params = new URLSearchParams(searchParams);
      params.set(sortField, e.target.value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   const params = new URLSearchParams(searchParams);
   const sortValue = params.get(sortField) || '';

   return (
      <Select options={options} handleSort={handleSort} value={sortValue} />
   );
}

export default SortBy;
