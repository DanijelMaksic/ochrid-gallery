import Link from 'next/link';
import OrderPlaced from '@/src/ui/checkout-components/order-placed';

export const metadata = {
   title: 'Thank you!',
};

function Page() {
   return (
      <div className="flex flex-col justify-center items-center my-44 2xl:my-28 md:my-72 xs:my-32 xs:px-4 text-center">
         <h2 className="text-6xl 2xl:text-5xl md:text-6xl font-semibold mb-10 2xl:mb-8">
            Thank you!
         </h2>

         <OrderPlaced />

         <span className="mb-12 2xl:mb-8 text-xl md:text-2xl">
            It will be delivered to you in 3-7 business days.
         </span>

         <Link
            href={'/'}
            className="text-2xl 2xl:text-xl md:text-2xl px-6 2xl:px-5 py-3 2xl:py-2.5 md:px-6 md:py-3 bg-primary-800 text-primary-50 rounded-md hover:bg-primary-200 hover:text-primary-900 transition-custom"
         >
            &larr; Back to Home
         </Link>
      </div>
   );
}

export default Page;
