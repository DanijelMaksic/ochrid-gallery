'use client';

import { format } from 'date-fns';
import { motion } from 'motion/react';
import { TbHeartPlus } from 'react-icons/tb';
import { CgShoppingBag } from 'react-icons/cg';
import { FaRegAddressBook } from 'react-icons/fa';
import { MdOutlineRateReview } from 'react-icons/md';

import StatTemplate from '@/src/ui/account-components/stat-template';

function AccountOverview({
   session,
   orderCount,
   wishlistCount,
   reviewCount,
   addressCount,
   user,
}) {
   const stats = [
      {
         icon: <CgShoppingBag className="size-12 text-[#285D69]" />,
         color: 'bg-[#CEDBEA]',
         label: 'Orders',
         value: orderCount,
      },
      {
         icon: <TbHeartPlus className="size-12 text-[#a74043]" />,
         color: 'bg-[#fddadf]',
         label: 'Wishlists',
         value: wishlistCount,
      },
      {
         icon: <MdOutlineRateReview className="size-12 text-[#4B663B]" />,
         color: 'bg-[#CDDFC4]',
         label: 'Reviews',
         value: reviewCount,
      },
      {
         icon: <FaRegAddressBook className="size-12 text-[#6A3B61]" />,
         color: 'bg-[#D9D1D7]',
         label: 'Addresses',
         value: addressCount,
      },
   ];

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.2 }}
         className="flex flex-col gap-3"
      >
         <h1 className="text-4xl 2xl:text-3xl font-semibold">
            Profile overview
         </h1>

         <div className="grid grid-cols-2 lg:grid-cols-1 gap-12 xs:gap-6 pt-6 xs:pt-3">
            <div className="grid grid-cols-2 xs:grid-cols-2 gap-5 xs:gap-3.5">
               {stats.map((item) => (
                  <StatTemplate key={item.label} item={item} />
               ))}
            </div>

            <div className="bg-primary-100 rounded-xl px-12 py-8 lg:py-6 flex flex-col items-center justify-center">
               <div className="flex gap-3 items-center mb-4">
                  <img
                     className="h-24 lg:h-20 rounded-full opacity-95"
                     referrerPolicy="no-referrer"
                     src={session?.user?.image}
                     alt={session?.user?.name}
                  />
               </div>

               <span className="text-[1.65rem] font-semibold mb-1">
                  {session?.user.name}
               </span>

               <span className="text-xl text-primary-800 mb-8 lg:mb-6">
                  {session?.user.email}
               </span>

               <span className="text-xl text-primary-800 italic">
                  Joined: {format(user.created_at, 'MMM d, yyyy')}
               </span>
            </div>
         </div>
      </motion.div>
   );
}

export default AccountOverview;
