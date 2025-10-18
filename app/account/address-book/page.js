import { auth } from '@/src/lib/auth';
import { getCountries, getUser } from '@/src/lib/data-service';

import AddressBook from '@/app/account/address-book/address-book';
import AddressCard from '@/src/ui/account-components/address-card';

export const metadata = {
   title: 'Account/Address book',
};

async function Page() {
   const [session, countries] = await Promise.all([auth(), getCountries()]);

   const { 'address-book': addresses } = await getUser(session.user.email);

   return (
      <AddressBook session={session} countries={countries}>
         {addresses &&
            addresses.map(
               (address) =>
                  address.billing_email === session?.user?.email && (
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
