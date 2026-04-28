'use client';

import Link from 'next/link';

function Error({ error }) {
   const isOffline = error.message === 'Failed to fetch';

   return (
      <main className="bg-primary-50 h-screen flex items-center justify-center text-primary-900 ">
         <div className="flex flex-col items-center gap-8 bg-primary-200 px-20 xs:px-4 py-10 rounded-md mb-32 border-2  border-primary-300 w-170 2xl:w-150 sm:w-140 xs:w-92">
            <div className="flex gap-3 flex-col items-center">
               <p className="text-5xl 2xl:text-4xl text-center">
                  {isOffline
                     ? 'No internet connection'
                     : 'Something went wrong...'}
               </p>
               <p className="text-2xl 2xl:text-xl text-primary-800 text-center">
                  {isOffline
                     ? "Don't worry — your cart is saved. Reconnect to the internet and try placing your order again."
                     : error.message}
               </p>
            </div>

            <Link href={isOffline ? '/review-order' : '/'}>
               <button className="text-xl 2xl:text-lg underlined-text">
                  {isOffline ? (
                     <span> &larr; &nbsp;Back to Review Order page</span>
                  ) : (
                     <span> &larr; &nbsp;Back to home</span>
                  )}
               </button>
            </Link>
         </div>
      </main>
   );
}

export default Error;
