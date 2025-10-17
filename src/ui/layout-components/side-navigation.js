'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useActionState, useEffect, useState, useTransition } from 'react';

import { CgSpinner } from 'react-icons/cg';
import { MdRateReview } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa6';
import { FaHeart, FaUser } from 'react-icons/fa';
import { signOutAction } from '@/src/lib/actions';
import { useFavAddress } from '@/src/contexts/fav-address-context';
import { RiChatHistoryFill, RiLogoutBoxRFill } from 'react-icons/ri';

const navLinks = [
   {
      name: 'Overview',
      href: '/account',
      icon: <FaUser className="2xl:size-4 lg:size-5 xs:size-6" />,
   },
   {
      name: 'Order history',
      href: '/account/order-history',
      icon: <RiChatHistoryFill className="2xl:size-4 lg:size-5 xs:size-6" />,
   },
   {
      name: 'Wishlist',
      href: '/account/wishlist',
      icon: <FaHeart className="2xl:size-4 lg:size-5 xs:size-6" />,
   },
   {
      name: 'Reviews',
      href: '/account/reviews',
      icon: <MdRateReview className="2xl:size-4 lg:size-5 xs:size-6" />,
   },
   {
      name: 'Address book',
      href: '/account/address-book',
      icon: <FaAddressBook className="2xl:size-4  lg:size-5 xs:size-6" />,
   },
];

function SideNavigation() {
   const pathname = usePathname();
   const [state, action, isPending] = useActionState(signOutAction);
   const { setFavAddress } = useFavAddress();
   const [isPending2, startTransition] = useTransition();

   const [isMedium, setIsMedium] = useState(false);

   async function onSubmit(e) {
      e.preventDefault();

      startTransition(() => {
         action();
      });

      setFavAddress({});
   }

   useEffect(() => {
      const mediaQueryMedium = window.matchMedia('(max-width: 768px)');

      setIsMedium(mediaQueryMedium.matches);
   }, [setIsMedium]);

   return (
      <nav className="xs:border-t-2 border-primary-400 xs:fixed xs:bottom-0 xs:right-0 xs:w-full xs:bg-primary-0  xs:z-20">
         <div className="flex flex-col xs:flex-row xs:justify-center xs:items-center h-120 xs:h-fit text-lg border-r-2 border-primary-300">
            {navLinks.map((link) => (
               <div key={link.name}>
                  <Link
                     href={link.href}
                     className={`${
                        pathname === link.href && 'bg-primary-100'
                     } py-4 md:py-5 px-10 xs:px-5 transition-custom flex items-center gap-4 font-semibold hover:bg-primary-100`}
                  >
                     {link.icon}
                     {!isMedium && (
                        <span className="text-base lg:text-lg">
                           {link.name}
                        </span>
                     )}
                  </Link>
               </div>
            ))}

            <form onSubmit={onSubmit} className="mt-auto xs:mt-0">
               <button
                  type="submit"
                  className={`flex gap-4 text-base lg:text-lg items-center py-4 xs:px-4 px-10 w-full font-semibold  hover:bg-primary-100 cursor-pointer ${
                     isPending && 'pointer-events-none opacity-60'
                  }`}
               >
                  {isPending ? (
                     <>
                        <CgSpinner className="rotate size-6 2xl:size-5 lg:size-6" />
                        {!isMedium && <span>Signing out</span>}
                     </>
                  ) : (
                     <>
                        <RiLogoutBoxRFill className="2xl:size-4 lg:size-5 xs:size-6" />

                        {!isMedium && <span>Sign out</span>}
                     </>
                  )}
               </button>
            </form>
         </div>
      </nav>
   );
}

export default SideNavigation;
