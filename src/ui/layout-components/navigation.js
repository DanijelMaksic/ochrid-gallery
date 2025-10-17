import Link from 'next/link';

import { BiUser } from 'react-icons/bi';
import { MdOutlineShoppingCart } from 'react-icons/md';

import UserPreview from '@/src/ui/layout-components/user-preview';

async function Navigation() {
   return (
      <div className="flex gap-8 lg:gap-6 items-center text-xl 2xl:text-lg lg:text-2xl mr-4">
         <div className="flex items-center gap-8 lg:gap-6">
            <button>
               <Link href="/" className="underlined-text">
                  Home
               </Link>
            </button>
            <button>
               <Link href="/items" className="underlined-text">
                  Icons
               </Link>
            </button>
         </div>

         <span>|</span>

         <div className="flex items-center gap-4">
            <UserPreview />

            <Link href="/account" aria-label="To Account Page">
               <BiUser className="bg-primary-0 rounded-lg border border-primary-400 p-2 2xl:p-1.5 lg:p-2 hover:bg-primary-800 hover:border-primary-800 hover:text-primary-0 size-9 2xl:size-8 lg:size-9" />
            </Link>

            <Link href="/cart" aria-label="To Cart Page">
               <MdOutlineShoppingCart className="bg-primary-0 border border-primary-400 rounded-lg p-2 2xl:p-1.5 lg:p-2 transition-custom hover:bg-primary-800 hover:text-primary-0 hover:border-primary-800 size-9 2xl:size-8 lg:size-9" />
            </Link>
         </div>
      </div>
   );
}

export default Navigation;
