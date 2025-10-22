'use client';

import { useTransition } from 'react';
import { addToWishlist, removeFromWishlist } from '@/src/lib/actions';

import { CgSpinner } from 'react-icons/cg';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function WishlistButton({ userId, itemId, isWishlisted }) {
   const [isPending, startTransition] = useTransition();

   const handleAdd = () => {
      startTransition(() => {
         addToWishlist(userId, itemId);
      });
   };

   const handleRemove = () => {
      startTransition(() => {
         removeFromWishlist(itemId, 'itemPage');
      });
   };

   return (
      <button
         onClick={!isWishlisted ? handleAdd : handleRemove}
         className={`self-end border-2 border-primary-500 rounded-md text-xl 2xl:text-lg lg:text-2xl xs:text-2xl px-4 py-1 flex items-center gap-2 md:px-6 md:py-2 hover:bg-primary-100 transition-custom xs:self-start ${
            isPending && 'pointer-events-none opacity-70'
         }`}
      >
         {!isWishlisted ? (
            <>
               {isPending ? (
                  <>
                     <CgSpinner className="rotate" />
                     <span>Adding...</span>
                  </>
               ) : (
                  <>
                     <FaRegHeart />
                     <span>Add to Wishlist</span>
                  </>
               )}
            </>
         ) : (
            <>
               {isPending ? (
                  <>
                     <CgSpinner className="rotate" />
                     <span>Removing...</span>
                  </>
               ) : (
                  <>
                     <FaHeart />

                     <span>On Wishlist</span>
                  </>
               )}
            </>
         )}
      </button>
   );
}

export default WishlistButton;
