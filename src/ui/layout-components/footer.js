import Logo from '@/src/ui/layout-components/logo';
import Link from 'next/link';

function Footer() {
   const startYear = 2025;
   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-primary-200 px-24 pt-12 pb-20 flex flex-col gap-6 lg:gap-8 md:gap-10 xs:px-12">
         <Logo />
         <div className="grid grid-cols-[1fr_1fr_16rem] lg:grid-cols-[1fr_1fr_10rem] md:grid-cols-1 lg:gap-16">
            <div className="flex flex-col gap-6">
               <div className="flex flex-col gap-2 2xl:gap-1 lg:gap-2 text-xl 2xl:text-lg lg:text-2xl xs:text-xl">
                  <span>
                     <strong>Address:</strong> Address 123
                  </span>
                  <span className="sm:hidden">
                     <strong>Email:</strong> ochrid.gallery@example.com
                  </span>

                  <span className="xs-reverse:hidden">
                     <strong>Email:</strong> ochrid.gallery
                     <br />
                     @example.com
                  </span>

                  <span>
                     <strong>Phone:</strong> XXX-XXXX
                  </span>
                  <span>
                     <strong>Working hours:</strong> 8 AM &mdash; 16 PM
                  </span>
               </div>
            </div>

            <div className="flex flex-col gap-6 2xl:gap-4 text-xl 2xl:text-lg justify-center lg:text-2xl xs:text-xl">
               <span>Project for portfolio purposes.</span>
               <div>
                  Icons and painting of procession by{' '}
                  <Link
                     href={'https://damascenegallery.com/'}
                     className="underlined-text font-semibold"
                     target="_blank"
                  >
                     Damascene Gallery
                  </Link>
                  .
               </div>
               <span>
                  Copyright ©{startYear}−{currentYear} Ochrid gallery, All
                  rights reserved
               </span>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
