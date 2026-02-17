import Link from 'next/link';

import { auth } from '@/src/lib/auth';
import { BsBagHeart } from 'react-icons/bs';
import { getWishlistDates, getWishlist } from '@/src/lib/data-service';

import Search from '@/src/ui/operations/search';
import Pagination from '@/src/ui/operations/pagination';
import WishlistItem from '@/src/ui/wishlist/wishlist-item';
import SortOperations from '@/src/ui/operations/sort-operations';
import FilterOperations from '@/src/ui/operations/filter-opearions';

export const metadata = {
   title: 'Account/Wishlist',
};

async function Page({ searchParams }) {
   const session = await auth();
   const userID = session.user.userId;

   const [wishlistData, dates] = await Promise.all([
      getWishlist(userID),
      getWishlistDates(userID),
   ]);

   const wishlist = wishlistData.map((item) => item.items);

   if (!wishlist.length)
      return (
         <div className="px-35 lg:px-12 md:px-6 sm:px-0 pb-14 flex flex-col gap-10 xs:mt-30">
            <div className="bg-primary-50 border-2 rounded-md border-primary-500 px-24 sm:px-12 py-12 sm:py-10 text-2xl font-semibold flex flex-col items-center gap-6">
               <BsBagHeart className="text-7xl 2xl:text-6xl md:text-7xl xs:text-6xl" />

               <div className="flex flex-col gap-2 md:gap-3 items-center">
                  <span className="text-2xl md:text-3xl xs:text-2xl text-center">
                     Add an icon to your wishlist to see it here
                  </span>

                  <Link href={'/items'}>
                     <span className="text-xl 2xl:text-lg md:text-2xl xs:text-xl text-primary-800 underlined-text">
                        Browse icons now &rarr;
                     </span>
                  </Link>
               </div>
            </div>
         </div>
      );

   let filteredItems;

   // FILTER
   const filter = searchParams?.show ?? 'all';
   if (filter === 'all') filteredItems = wishlist;
   if (filter === 'in-stock')
      filteredItems = wishlist.filter((item) => item.in_stock === true);

   // SORT
   const sort = searchParams?.sort ?? 'created_at-asc';

   const [field, direction] = sort.split('-');

   const modifier = direction === 'asc' ? 1 : -1;
   const dateModifier = direction === 'asc' ? -1 : 1;

   function compare(a, b) {
      if (a['name'] < b['name']) {
         return -1 * modifier;
      }
      if (a['name'] > b['name']) {
         return 1 * modifier;
      }
      return 0;
   }

   let sortedItems;

   if (field === 'name') sortedItems = filteredItems.sort(compare);

   if (field === 'created_at')
      sortedItems = filteredItems.sort(
         (a, b) => (new Date(a[field]) - new Date(b[field])) * dateModifier,
      );

   sortedItems = filteredItems.sort((a, b) => (a[field] - b[field]) * modifier);

   // SEARCH QUERY

   const searchQuery = searchParams?.search || '';
   const searchedItems = sortedItems.filter(
      (item) =>
         item.name?.toLowerCase().includes(searchQuery) ||
         item.name?.includes(searchQuery),
   );

   // PAGINATION

   const page = !searchParams?.page ? 1 : searchParams?.page;

   const from = (page - 1) * Number(process.env.NEXT_PUBLIC_WISHLIST_PAGE_SIZE);
   const to = from + Number(process.env.NEXT_PUBLIC_WISHLIST_PAGE_SIZE);

   const paginatedItems = searchedItems.length
      ? searchedItems.slice(from, to)
      : sortedItems.slice(from, to);

   return (
      <div className="flex flex-col gap-10 2xl:gap-8">
         <div className="flex gap-4 justify-center items-center lg:flex-col">
            <Search field={'product name'} type="wishlist" />

            <div className="flex gap-4 items-center lg:flex-col">
               <FilterOperations />
               <SortOperations />
            </div>
         </div>

         <div className="flex flex-col">
            {!searchedItems.length
               ? searchedItems?.map((item) => (
                    <WishlistItem key={item.id} item={item} dates={dates} />
                 ))
               : paginatedItems?.map((item) => (
                    <WishlistItem key={item.id} item={item} dates={dates} />
                 ))}
         </div>

         {!searchedItems.length && (
            <p className="w-fit text-3xl 2xl:text-2xl py-4 px-12 xs:mb-68 self-center text-center bg-primary-50 border-2 border-primary-400 transition-custom rounded-md text-primary-900 pointer-events-none">
               No matching results...
            </p>
         )}

         <Pagination type="wishlist" count={searchedItems.length} />
      </div>
   );
}

export default Page;
