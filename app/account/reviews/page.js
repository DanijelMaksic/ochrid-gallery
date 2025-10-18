import { auth } from '@/src/lib/auth';
import { getItems, getReviews, getUser } from '@/src/lib/data-service';

import Reviews from '@/app/account/reviews/reviews';

export const metadata = {
   title: 'Account/Reviews',
};

async function Page() {
   const session = await auth();
   const user = await getUser(session?.user?.email);

   return <Reviews session={session} user={user} />;
}

export default Page;
