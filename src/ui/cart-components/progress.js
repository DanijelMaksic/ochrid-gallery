'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function Progress() {
   const pathname = usePathname();

   const [isXl, setIsXl] = useState(false);
   const [isMedium, setIsMedium] = useState(false);
   const [isSmall, setIsSmall] = useState(false);

   useEffect(() => {
      const mediaQueryXl = window.matchMedia('(max-width: 1280px)');
      const mediaQueryMedium = window.matchMedia('(max-width: 768px)');
      const mediaQuerySmall = window.matchMedia('(max-width: 640px)');

      setIsXl(mediaQueryXl.matches);
      setIsMedium(mediaQueryMedium.matches);
      setIsSmall(mediaQuerySmall.matches);
   }, [setIsXl, setIsSmall, setIsMedium]);

   return (
      <>
         {!isSmall ? (
            <div className="flex items-center pl-24 2xl:pl-14 gap-8 pb-6 pt-8 2xl:pb-4 2xl:pt-6 text-xl 2xl:text-lg bg-primary-900 text-primary-50 pointer-events-none">
               <BarItem path={'/cart'}>
                  1) {isXl && !isMedium && 'Cart'} {isMedium && ''}
                  {!isXl && !isMedium && 'Shopping cart'}
               </BarItem>
               <BarItem path={'/billing-info'}>
                  2) {isXl && !isMedium && 'Billing'} {isMedium && ''}
                  {!isXl && !isMedium && 'Billing info'}
               </BarItem>
               <BarItem path={'/payment-method'}>
                  3) {isXl && !isMedium && 'Payment'} {isMedium && ''}
                  {!isXl && !isMedium && 'Payment method'}
               </BarItem>
               <BarItem path={'/review-order'}>
                  4) {isXl && !isMedium && 'Review'} {isMedium && ''}
                  {!isXl && !isMedium && 'Review order'}
               </BarItem>
            </div>
         ) : (
            <div className="flex items-center gap-5 py-6 xs:py-3 xs:gap-3 xs:text-2xl text-3xl justify-center bg-primary-900 text-primary-50 pointer-events-none">
               <span
                  className={`flex items-center gap-3 justify-center ${
                     '/cart' !== pathname
                        ? 'text-primary-600 w-9.5 xs:w-8.5 border rounded-full border-primary-600'
                        : 'text-primary-950 w-9.5 xs:w-8.5 bg-primary-50 rounded-full font-semibold'
                  }`}
               >
                  1
               </span>
               <span className="text-primary-700">&#8213;</span>
               <span
                  className={`flex items-center gap-3 justify-center ${
                     '/billing-info' !== pathname
                        ? 'text-primary-600 w-9.5 xs:w-8.5 border rounded-full border-primary-600'
                        : 'text-primary-950 w-9.5 xs:w-8.5 bg-primary-50 rounded-full font-semibold'
                  }`}
               >
                  2
               </span>
               <span className="text-primary-700">&#8213;</span>
               <span
                  className={`flex items-center gap-3 justify-center ${
                     '/payment-method' !== pathname
                        ? 'text-primary-600 w-9.5 xs:w-8.5 border rounded-full border-primary-600'
                        : 'text-primary-950 w-9.5 xs:w-8.5 bg-primary-50 rounded-full font-semibold'
                  }`}
               >
                  3
               </span>
               <span className="text-primary-700">&#8213;</span>
               <span
                  className={`flex items-center gap-3 justify-center ${
                     '/review-order' !== pathname
                        ? 'text-primary-600 w-9.5 xs:w-8.5 border rounded-full border-primary-600'
                        : 'text-primary-950 w-9.5 xs:w-8.5 bg-primary-50 rounded-full font-semibold'
                  }`}
               >
                  4
               </span>
            </div>
         )}
      </>
   );
}

function BarItem({ children, path }) {
   const pathname = usePathname();

   return (
      <>
         <span
            className={`flex items-center gap-3 pt-2 2xl:pt-1 border-t-4 pr-35 2xl:pr-31.5 ${
               path !== pathname ? 'text-primary-600  border-primary-700' : ''
            }`}
         >
            {children}
         </span>
      </>
   );
}

export default Progress;
