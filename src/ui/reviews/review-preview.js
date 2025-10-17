import Link from 'next/link';
import Image from 'next/image';

import { format } from 'date-fns';
import { BiDislike, BiLike } from 'react-icons/bi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

import ReviewOperations from '@/src/ui/reviews/review-operations';

function ReviewPreview({ review, items }) {
   const {
      title,
      content,
      recommended,
      likes,
      dislikes,
      username,
      created_at,
   } = review;

   const [reviewedItem] = items.filter((item) => item.id === review.item_id);

   const { name, image, id } = reviewedItem;

   return (
      <div className="bg-primary-50 border-2 border-primary-500 rounded-md text-xl grid grid-cols-[2.4fr_10fr] lg:grid-cols-none lg:grid-rows-[3.1rem_1fr] mx-24 2xl:mx-0">
         <Link
            href={`/items/${id}`}
            className="flex flex-col overflow-hidden hover:opacity-85 transition-all duration-200"
         >
            <div className="relative h-full lg:h-0">
               <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="bg-primary-200 object-contain opacity-95"
               />
            </div>

            <div className="flex gap-2 flex-col p-3 text-center">
               <h2
                  className={`font-semibold text-primary-900 ${
                     name.length > 28
                        ? 'text-sm lg:text-lg'
                        : 'text-lg 2xl:text-base lg:text-xl'
                  }`}
               >
                  {' '}
                  {name.length > 41 ? `${name.slice(0, 42)}...` : name}
               </h2>
            </div>
         </Link>

         <div className="border-l-2 border-primary-500 lg:border-t-2 lg:border-l-0 px-12 py-6 xs:px-6 xs:py-3">
            <div className="flex items-center  justify-between mb-6 xs:mb-4 sm:flex-col">
               <h3 className="font-semibold text-2xl">{title}</h3>

               <div className="flex items-center gap-3 text-primary-800 2xl:text-lg">
                  <span>{username},</span>
                  <span>{format(created_at, 'M.d.yyyy')}</span>
               </div>
            </div>

            <p className="mb-6 2xl:text-lg text-justify xs:leading-7.5">
               {content}
            </p>

            <div className="flex items-center justify-between md:flex-col md:gap-6 sm:gap-4">
               {recommended === true ? (
                  <div className="flex items-center gap-2 bg-primary-800 text-primary-0 rounded-md px-3 py-1">
                     <IoIosCheckmarkCircleOutline className="size-7 2xl:size-6" />

                     <span className="2xl:text-lg">
                        I recommend this product
                     </span>
                  </div>
               ) : (
                  <div className="flex items-center gap-2 bg-primary-800 text-primary-0 rounded-md px-3 py-1">
                     <IoCloseCircleOutline className="size-7 2xl:size-6" />

                     <span className="2xl:text-lg">
                        I don&apos;t recommend this product
                     </span>
                  </div>
               )}

               <div className="flex items-center gap-14 2xl:text-lg lg:flex-col lg:gap-1 md:flex-row md:gap-12">
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2">
                        <BiLike className="size-5 2xl:size-4.5" />
                        <span className="text-primary-800">{likes}</span>
                     </div>

                     <div className="flex items-center gap-2">
                        <BiDislike className="size-5 2xl:size-4.5" />
                        <span className="text-primary-800">{dislikes}</span>
                     </div>
                  </div>

                  <ReviewOperations review={review} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default ReviewPreview;
