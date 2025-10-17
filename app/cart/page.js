import { auth } from '@/src/lib/auth';
import { getItems } from '@/src/lib/data-service';

import Summary from '@/src/ui/cart-components/summary';
import Progress from '@/src/ui/cart-components/progress';
import Trending from '@/src/ui/cart-components/trending';
import ShoppingCart from '@/src/ui/cart-components/shopping-cart';

export const metadata = {
   title: 'Cart',
};

async function Page() {
   const [session, items] = await Promise.all([auth(), getItems()]);

   return (
      <div>
         <Progress />

         <div className="grid grid-cols-[1fr_38rem] 2xl:grid-cols-[1fr_30rem] lg:grid-cols-1">
            <ShoppingCart items={items} type="modify" />

            <Summary type="cart" session={session} />
         </div>

         <Trending />
      </div>
   );
}

export default Page;
