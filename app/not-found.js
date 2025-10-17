import Link from 'next/link';

function NotFound() {
   return (
      <div className="bg-primary-50  h-screen flex items-center justify-center text-primary-900 ">
         <div className="flex flex-col items-center gap-8 bg-primary-200 px-20 py-10 rounded-md mb-32 border-2  border-primary-300">
            <p className="text-5xl text-center">Page not Found...</p>
            <Link href="/">
               <button className="text-xl underlined-text">
                  &larr; &nbsp;Back to home
               </button>
            </Link>
         </div>
      </div>
   );
}

export default NotFound;
