import Link from 'next/link';

function ReviewWarning({ onClose, type }) {
   if (type === 'review' || 'like')
      return (
         <div className="flex flex-col gap-8 2xl:gap-6 px-14 md:px-12 py-10 2xl:py-8 rounded-lg bg-primary-0">
            {type === 'review' && (
               <h2 className="text-3xl 2xl:text-2xl font-semibold border-b-2 border-primary-400 pb-6 2xl:pb-4 text-center md:text-3xl xs:text-2xl md:w-100 xs:w-60">
                  To write a review you need to <br /> buy the product and be
                  signed in.
               </h2>
            )}
            {type === 'like' && (
               <h2 className="text-3xl 2xl:text-2xl md:text-3xl xs:text-2xl font-semibold border-b-2 border-primary-400 pb-6 text-center md:w-100 xs:w-60">
                  To use this option you need <br /> to be signed in.
               </h2>
            )}

            <Options onClose={onClose} />
         </div>
      );

   if (type === 'alreadyReviewed')
      return (
         <div className="flex flex-col gap-8 px-14 py-10 2xl:px-12 2xl:py-8 2xl:gap-6 rounded-lg bg-primary-0">
            <h2 className="text-3xl 2xl:text-2xl font-semibold border-b-2 border-primary-400 pb-6 text-center md:w-100 md:text-3xl xs:text-2xl xs:w-60">
               You already reviewed this product.
            </h2>

            <div className="flex gap-10 2xl:gap-8 text-xl justify-center">
               <button
                  onClick={onClose}
                  className="px-6 2xl:px-5 py-2 2xl:py-1.5 rounded-md border-2 text-2xl 2xl:text-xl md:text-2xl border-secondary border-primary-400 hover:bg-primary-100 transition-text"
               >
                  Close
               </button>
            </div>
         </div>
      );
}

function Options({ onClose }) {
   return (
      <div className="flex gap-10 justify-center xs:gap-4">
         <button
            onClick={onClose}
            className="px-6 2xl:px-5 py-2 2xl:py-1.5 rounded-md border-2 text-2xl 2xl:text-xl md:text-2xl xs:text-xl border-secondary border-primary-400 hover:bg-primary-100 transition-text"
         >
            Close
         </button>
         <Link
            href={'/account'}
            className="bg-primary-800 text-primary-50 py-2.5 2xl:py-2 2xl:px-6 rounded-md hover:bg-primary-200 hover:text-primary-900 transition-text px-8 text-2xl 2xl:text-xl md:text-2xl xs:text-xl"
         >
            Sign in
         </Link>
      </div>
   );
}

export default ReviewWarning;
