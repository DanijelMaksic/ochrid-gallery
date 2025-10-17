import {
   getUser,
   getWishlistCount,
   getAddressCount,
   getArchivedOrderCount,
   getReviewCount,
} from '@/src/lib/data-service';
import { auth } from '@/src/lib/auth';

import AccountOverview from '@/app/account/AccountOverview';

export const metadata = {
   title: 'Account/Overview',
};

async function Page() {
   const session = await auth();
   const userEmail = session.user.email;

   const [user, orderCount, wishlistCount, reviewCount, addressCount] =
      await Promise.all([
         getUser(userEmail),
         getArchivedOrderCount(userEmail),
         getWishlistCount(session.user.userId),
         getReviewCount(userEmail),
         getAddressCount(userEmail),
      ]);

   return (
      <AccountOverview
         orderCount={orderCount}
         wishlistCount={wishlistCount}
         reviewCount={reviewCount}
         addressCount={addressCount}
         user={user}
         session={session}
      />
   );
}

export default Page;
