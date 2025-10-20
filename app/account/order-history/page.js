import { auth } from '@/src/lib/auth';
import { getArchivedOrders, getItems, getUser } from '@/src/lib/data-service';

import OrderHistory from '@/app/account/order-history/order-history';

export const metadata = {
   title: 'Account/Order history',
};

async function Page() {
   const [session, items] = await Promise.all([auth(), getItems()]);

   const { archive: orders } = await getUser(session?.user?.email);

   return <OrderHistory orders={orders} items={items} />;
}

export default Page;
