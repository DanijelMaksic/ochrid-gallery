'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Suspense, useEffect, useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { EB_Garamond, Italianno } from 'next/font/google';

import painting from '@/public/painting.png';

const garamond = EB_Garamond({
   subsets: ['latin'],
   display: 'swap',
   weight: '500',
});

const italianno = Italianno({
   subsets: ['latin'],
   display: 'swap',
   weight: '400',
});

function CTA() {
   const [mounted, setMounted] = useState(false);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => setMounted(true), []);

   return (
      <div className="relative h-screen flex justify-center items-center">
         <div className="absolute z-10 flex flex-col gap-10 mb-40 2xl:mb-30 lg:gap-8 lg:mb-20 xs:px-6">
            <h1
               className={`text-primary-0 text-9xl 2xl:text-8xl text-center sm:text-7xl ${garamond.className} font-medium`}
            >
               Orthodox Icons Gallery
            </h1>

            <Link
               href="/items"
               className={`text-5xl rounded-lg pr-6 group pl-8 py-2.5 w-fit self-center flex gap-2 items-center transition-custom  text-black/80 hover:bg-primary-800 hover:text-primary-0 bg-primary-300 md:text-6xl md:pr-8 md:pl-10 sm:text-5xl ${italianno.className}`}
            >
               <span>Shop icons</span>
               <IoIosArrowRoundForward className="size-8 group-hover:translate-x-[25%] transition-all" />
            </Link>
         </div>

         <Suspense
            fallback={
               <div className="md:order-1 h-[26rem] 2xl:h-[23rem] lg:h-[20rem] xs:h-[20rem]" />
            }
         >
            <Image
               src={painting}
               fill
               placeholder="blur"
               quality={80}
               alt="painting"
               className={`bg-primary-200 object-cover transition-opacity duration-700 ease-in-out ${
                  loaded ? 'opacity-100' : 'opacity-0'
               }`}
               priority={true}
               sizes="100vw"
               fetchPriority="high"
               onLoad={() => setLoaded(true)}
            />
         </Suspense>

         <div
            className="absolute z-5 from-black bg-linear-to-t
 w-full h-full"
         ></div>
      </div>
   );
}

export default CTA;
