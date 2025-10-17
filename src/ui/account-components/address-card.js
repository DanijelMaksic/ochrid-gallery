import AddressOperations from '@/src/ui/account-components/address-operations';

async function AddresCard({ address, countries }) {
   const {
      billing_name,
      billing_address,
      billing_city,
      billing_post_code,
      billing_country,
      billing_phone,
   } = address;

   return (
      <div className="border-2 rounded-md border-primary-500 flex flex-col text-xl 2xl:text-lg">
         <div className="flex flex-col gap-0.5 px-8 py-4">
            <span className="font-semibold">{billing_name}</span>
            <span>{billing_address}</span>
            <div className="flex items-center gap-3">
               <span>{billing_city}</span>
               <span>{billing_post_code}</span>
            </div>

            <span>{billing_country}</span>
            <span>+{billing_phone}</span>
         </div>

         <AddressOperations address={address} countries={countries} />
      </div>
   );
}

export default AddresCard;
