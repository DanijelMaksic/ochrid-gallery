import { auth } from '@/src/lib/auth';
import { getArchivedOrders, getItems } from '@/src/lib/data-service';

import OrderHistory from '@/app/account/order-history/order-history';

export const metadata = {
   title: 'Account/Order history',
};

async function Page() {
   const [session, items, orders] = await Promise.all([
      auth(),
      getItems(),
      getArchivedOrders(),
   ]);

   const filteredOrders = orders.filter(
      (order) => order.email === session.user.email
   );

   return <OrderHistory filteredOrders={filteredOrders} items={items} />;
}

export default Page;
