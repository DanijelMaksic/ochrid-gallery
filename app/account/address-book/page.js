import { auth } from '@/src/lib/auth';
import { getAddresses, getCountries } from '@/src/lib/data-service';

import AddressBook from '@/app/account/address-book/address-book';
import AddressCard from '@/src/ui/account-components/address-card';

export const metadata = {
   title: 'Account/Address book',
};

async function Page() {
   const [session, addresses, countries] = await Promise.all([
      auth(),
      getAddresses(),
      getCountries(),
   ]);

   return (
      <AddressBook session={session} countries={countries}>
         {addresses &&
            addresses.map(
               (address) =>
                  address.billing_email === session.user.email && (
                     <AddressCard
                        key={address.id}
                        address={address}
                        countries={countries}
                     />
                  )
            )}
      </AddressBook>
   );
}

export default Page;
