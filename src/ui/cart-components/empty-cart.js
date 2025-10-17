import Link from 'next/link';
import { MdRemoveShoppingCart } from 'react-icons/md';

function EmptyCart() {
   return (
      <div className="text-center flex flex-col gap-3">
         <MdRemoveShoppingCart className="self-center text-9xl 2xl:text-8xl md:text-9xl mb-6 mt-20" />

         <h3
            className="text-3xl 2xl:text-2xl md:text-3xl
         font-semibold"
         >
            Your cart is empty
         </h3>

         <p className="text-primary-800 mb-6 px-44 xs:px-12 text-[1.4rem] 2xl:text-xl md:text-[1.4rem]">
            Your shopping cart is currently empty, but you can add products to
            it by accessing the product page
         </p>

         <Link href="/items">
            <button className="text-xl 2xl:text-lg md:text-2xl underlined-text mb-28">
               &larr; &nbsp;Back to store
            </button>
         </Link>
      </div>
   );
}

export default EmptyCart;
