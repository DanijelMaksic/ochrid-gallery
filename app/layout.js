import '@/app/index.css';

import { SessionProvider } from 'next-auth/react';

import { Ovo } from 'next/font/google';
import { CartProvider } from '@/src/contexts/cart-context';
import { OrderProvider } from '@/src/contexts/order-context';
import { NoteErrorProvider } from '@/src/contexts/note-error-context';
import { FavAddressProvider } from '@/src/contexts/fav-address-context';
import { LikedReviewProvider } from '@/src/contexts/liked-reviews-context';
import { PaymentMethodProvider } from '@/src/contexts/payment-method-context';
import { DislikedReviewsProvider } from '@/src/contexts/disliked-reviews-context';

import Sidebar from '@/src/ui/sidebar';
import Header from '@/src/ui/homepage/header';
import Footer from '@/src/ui/layout-components/footer';

const ovo = Ovo({
   subsets: ['latin'],
   display: 'swap',
   weight: '400',
});

export const metadata = {
   title: {
      template: '%s | Ochrid Gallery',
      default: 'Home | Ochrid Gallery',
   },
   description:
      'A Next.js e-commerce website for a fictional gallery. Includes checkout functionality and user authentication.',
};

export default function RootLayout({ children }) {
   return (
      <SessionProvider>
         <html lang="en">
            <body
               className={`${ovo.className} text-primary-900 antialiased selection:bg-primary-500/70 caret-primary-800`}
            >
               <div id="outer-container">
                  <Header />
                  <Sidebar />

                  <main id="page-wrap">
                     <CartProvider>
                        <FavAddressProvider>
                           <OrderProvider>
                              <LikedReviewProvider>
                                 <DislikedReviewsProvider>
                                    <NoteErrorProvider>
                                       <PaymentMethodProvider>
                                          {children}
                                       </PaymentMethodProvider>
                                    </NoteErrorProvider>
                                 </DislikedReviewsProvider>
                              </LikedReviewProvider>
                           </OrderProvider>
                        </FavAddressProvider>
                     </CartProvider>
                  </main>

                  <Footer />
               </div>
            </body>
         </html>
      </SessionProvider>
   );
}
