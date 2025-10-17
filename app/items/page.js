import { getItems } from '@/src/lib/data-service';

import Search from '@/src/ui/operations/search';
import ItemCard from '@/src/ui/items/item-card';
import Pagination from '@/src/ui/operations/pagination';
import SortOperations from '@/src/ui/operations/sort-opearions';
import FilterOperations from '@/src/ui/operations/filter-opearions';

export const metadata = {
   title: 'Icons',
};

async function Page({ searchParams }) {
   const items = await getItems();

   if (!items.length) return null;

   let filteredItems;

   // FILTER
   const filter = searchParams?.show ?? 'all';
   if (filter === 'all') filteredItems = items;
   if (filter === 'in-stock')
      filteredItems = items.filter((item) => item.in_stock === true);

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
         (a, b) => (new Date(a[field]) - new Date(b[field])) * dateModifier
      );

   sortedItems = filteredItems.sort((a, b) => (a[field] - b[field]) * modifier);

   // SEARCH QUERY

   const searchQuery = searchParams?.search || '';
   const searchedItems = sortedItems.filter(
      (item) =>
         item.name?.toLowerCase().includes(searchQuery) ||
         item.name?.includes(searchQuery)
   );

   // PAGINATION

   const page = !searchParams?.page ? 1 : searchParams?.page;

   const from = (page - 1) * Number(process.env.NEXT_PUBLIC_ITEMS_PAGE_SIZE);
   const to = from + Number(process.env.NEXT_PUBLIC_ITEMS_PAGE_SIZE);

   const paginatedItems = searchedItems.length
      ? searchedItems.slice(from, to)
      : sortedItems.slice(from, to);

   return (
      <div className="pt-10 pb-20 flex flex-col justify-center items-center gap-8 px-72 2xl:px-46 xl:px-32 md:px-12 md:pt-6 xs:px-14 xs:pt-4">
         <div className="flex gap-4 justify-between items-center lg:flex-col">
            <Search field={'product name'} type="items" />

            <div className="flex gap-4 items-center sm:flex-col">
               <FilterOperations />
               <SortOperations />
            </div>
         </div>

         {!searchedItems.length && (
            <p className="text-3xl 2xl:text-2xl py-4 px-12 mt-12 mb-66 text-center bg-primary-50 border-2 border-primary-400 transition-custom rounded-md text-primary-900 pointer-events-none">
               No matching results...
            </p>
         )}

         <div className="grid grid-cols-5 gap-10 2xl:gap-8 mb-8 xl:grid-cols-4 lg:grid-cols-3 md:gap-6 sm:grid-cols-2 sm:gap-8 xs:grid-cols-1 max-w-400">
            {!searchedItems.length
               ? searchedItems?.map((item) => (
                    <ItemCard item={item} key={item.id} />
                 ))
               : paginatedItems?.map((item) => (
                    <ItemCard item={item} key={item.id} />
                 ))}
         </div>

         <Pagination type="items" count={searchedItems.length} />
      </div>
   );
}

export default Page;
