'use client';

import { useTransition } from 'react';
import { removeFromWishlist } from '@/src/lib/actions';

function RemoveWishlistItem({ itemId }) {
   const [isPending, startTransition] = useTransition();

   const handleRemove = () => {
      startTransition(() => {
         removeFromWishlist(itemId, 'wishlistPage');
      });
   };

   return (
      <div className="inline-flex">
         <button
            onClick={handleRemove}
            className={`underlined-text ${isPending && 'pointer-events-none'}`}
         >
            {isPending ? <span>Removing...</span> : <span>Remove</span>}
         </button>
      </div>
   );
}

export default RemoveWishlistItem;
