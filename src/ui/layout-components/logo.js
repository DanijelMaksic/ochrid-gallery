import Link from 'next/link';
import { Rochester } from 'next/font/google';

const rochester = Rochester({
   subsets: ['latin'],
   display: 'swap',
   weight: '400',
});

function Logo() {
   return (
      <div>
         <Link
            href="/"
            className={`${rochester.className} text-5xl hover:text-primary-800 transition-all duration-200 2text-4xl lg:text-5xl md:text-6xl xs:text-5xl`}
         >
            Ochrid Gallery
         </Link>
      </div>
   );
}

export default Logo;
