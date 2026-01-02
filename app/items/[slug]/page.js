import { auth } from '@/src/lib/auth';
import ItemDetails from '@/src/ui/items/item-details';
import { getItem, isOnWishlist } from '@/src/lib/data-service';
import {
   getArchivedOrders,
   getItems,
   getReviews,
   getUser,
} from '@/src/lib/data-service';

async function Page({ params }) {
   const resolvedParams = await params;
   const [session, items, item, reviews, orders] = await Promise.all([
      auth(),
      getItems(),
      getItem(resolvedParams.slug),
      getReviews(),
      getArchivedOrders(),
   ]);

   let user;
   let isWishlisted;
   if (session) {
      user = await getUser(session.user.email);
      isWishlisted = await isOnWishlist(user.id, item.id);
   }

   return (
      <div className="mx-92 my-16 2xl:mt-10 2xl:mb-16 2xl:mx-62 xl:mx-32 lg:mx-50 md:mx-12 sm:mx-4 xs:mt-12 xs:mx-2">
         <ItemDetails
            item={item}
            session={session}
            reviews={reviews}
            items={items}
            orders={orders}
            user={user}
            isWishlisted={isWishlisted}
         />
      </div>
   );
}

export default Page;
