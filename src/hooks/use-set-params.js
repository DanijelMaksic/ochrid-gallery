import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSetParams() {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   function handler(fieldName, value) {
      const params = new URLSearchParams(searchParams);
      if (value === null || value.trim() === '') {
         params.delete(fieldName);
      } else {
         params.set(fieldName, value);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   return handler;
}
