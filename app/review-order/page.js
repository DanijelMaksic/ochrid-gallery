import { getItems } from '@/src/lib/data-service';

import Summary from '@/src/ui/cart-components/summary';
import Progress from '@/src/ui/cart-components/progress';
import ShoppingCart from '@/src/ui/cart-components/shopping-cart';
import BillingDetails from '@/src/ui/cart-components/billing-details';

export const metadata = {
   title: 'Review order',
};

async function Page() {
   const items = await getItems();

   return (
      <>
         <Progress />

         <div className="grid grid-cols-[1fr_38rem] 2xl:grid-cols-[1fr_30rem] lg:grid-cols-1">
            <div>
               <ShoppingCart items={items} type="readOnly" />
               <BillingDetails />
            </div>

            <Summary type="placeOrder" />
         </div>
      </>
   );
}

export default Page;
