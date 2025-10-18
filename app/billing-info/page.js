import { auth } from '@/src/lib/auth';
import { getCountries, getUser } from '@/src/lib/data-service';

import Progress from '@/src/ui/cart-components/progress';
import Billing from '@/src/ui/checkout-components/billing';

export const metadata = {
   title: 'Billing info',
};

async function Page() {
   const [session, countries] = await Promise.all([auth(), getCountries()]);

   const { 'address-book': addresses } = await getUser(session.user.email);

   return (
      <div>
         <Progress />
         <Billing
            addresses={addresses}
            session={session}
            countries={countries}
         />
      </div>
   );
}

export default Page;
