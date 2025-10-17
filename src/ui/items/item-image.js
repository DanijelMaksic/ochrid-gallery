'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import mediumZoom from 'medium-zoom';

function ItemImage({ name, image }) {
   useEffect(() => {
      const zoom = mediumZoom('.parent img', {
         margin: 60,
      });

      return () => {
         zoom.detach();
      };
   }, []);

   return (
      <div className="relative parent flex items-center justify-center bg-primary-200 rounded-lg overflow-hidden transition-custom border-2 border-primary-400 h-132 max-w-140 2xl:h-120 w-full lg:justify-self-center xs:w-90 xs:h-100 justify-self-end">
         <Image
            src={image}
            alt={name}
            fill
            priority={true}
            quality={60}
            sizes="100vw"
            fetchPriority="high"
            className="opacity-95 object-contain"
         />
      </div>
   );
}

export default ItemImage;
