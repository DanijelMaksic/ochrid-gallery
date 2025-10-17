'use client';

import { motion } from 'motion/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Pagination({ count, type }) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();
   const params = new URLSearchParams(searchParams);

   let pageSize;

   if (type === 'items')
      pageSize = Number(process.env.NEXT_PUBLIC_ITEMS_PAGE_SIZE);

   if (type === 'wishlist')
      pageSize = Number(process.env.NEXT_PUBLIC_WISHLIST_PAGE_SIZE);

   const currentPage = !params.get('page')
      ? 1
      : Number(searchParams.get('page'));

   const pageCount = Math.ceil(count / pageSize);

   function nextPage() {
      const next = currentPage === pageCount ? currentPage : currentPage + 1;

      const params = new URLSearchParams(searchParams);
      params.set('page', next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   function prevPage() {
      const prev = currentPage === 1 ? currentPage : currentPage - 1;

      const params = new URLSearchParams(searchParams);
      params.set('page', prev);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
   }

   if (pageCount <= 1) return null;

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="flex gap-1 items-center w-full max-w-220 justify-between px-12 2xl:px-10 bg-primary-50 rounded-md py-3 2xl:py-2.5 border-2 border-primary-400 sm:flex-col sm:gap-3"
      >
         <div className="text-lg 2xl:text-base lg:text-lg">
            Showing{' '}
            <span className="font-semibold">
               {' '}
               {(currentPage - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold">
               {' '}
               {currentPage === pageCount ? count : currentPage * pageSize}
            </span>{' '}
            of <span className="font-semibold">{count}</span> results
         </div>

         <div className="flex items-center gap-6">
            <PaginationButton
               type="prev"
               onClick={prevPage}
               disabled={currentPage === 1}
            >
               <HiChevronLeft />
               <span>Previous</span>
            </PaginationButton>

            <PaginationButton
               type="next"
               onClick={nextPage}
               disabled={currentPage === pageCount}
            >
               <span>Next</span>
               <HiChevronRight />
            </PaginationButton>
         </div>
      </motion.div>
   );
}

function PaginationButton({ children, type, onClick, disabled }) {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={`flex gap-1 items-center justify-center text-lg 2xl:text-base lg:text-lg font-semibold hover:bg-primary-800 hover:text-primary-100 rounded-md transition-custom py-0.5 ${
            type === 'prev' ? 'pr-3 pl-2' : 'pl-3 pr-2'
         } ${disabled && 'pointer-events-none opacity-50'}`}
      >
         {children}
      </button>
   );
}

export default Pagination;
