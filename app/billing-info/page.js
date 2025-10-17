import { auth } from '@/src/lib/auth';
import { getAddresses, getCountries } from '@/src/lib/data-service';

import Progress from '@/src/ui/cart-components/progress';
import Billing from '@/src/ui/checkout-components/billing';

export const metadata = {
   title: 'Billing info',
};

async function Page() {
   const [session, countries, addresses] = await Promise.all([
      auth(),
      getCountries(),
      getAddresses(),
   ]);

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
