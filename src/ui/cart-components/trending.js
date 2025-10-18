import Link from 'next/link';
import Image from 'next/image';

import { formatCurrency } from '@/src/utils/helpers';
import { getPopularItems } from '@/src/lib/data-service';

async function Trending() {
   const trendingItems = await getPopularItems();

   const filteredItems = trendingItems.filter((item) => item.in_stock === true);

   const firstFiveItems = filteredItems.slice(0, 5);

   return (
      <div className="flex flex-col items-center gap-8 px-32 xl:px-16 lg:px-32 md:px-8 sm:px-16 xs:px-6 py-10 bg-primary-50">
         <h2 className="text-4xl 2xl:text-3xl font-semibold self-start justify-self-start 2xl-reverse:self-center 2xl-reverse:justify-self-center">
            Trending Products
         </h2>

         <div className="grid grid-cols-5 gap-18 2xl:gap-12 xl:gap-8 lg:gap-12 md:gap-8 xs:gap-6 mb-8 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 xs:px-14 max-w-fit">
            {firstFiveItems.map((item) => (
               <TrendingItem item={item} key={item.id} />
            ))}
         </div>
      </div>
   );
}

function TrendingItem({ item }) {
   const { name, price, image, slug, in_stock } = item;

   return (
      <Link
         href={`/items/${slug}`}
         className={`flex flex-col border-2 border-primary-400 rounded-md overflow-hidden hover:opacity-85 transition-all duration-200 ${
            !in_stock && 'opacity-65'
         }`}
      >
         <div className="relative h-62 xs:h-70">
            <Image
               src={image}
               alt={name}
               fill
               className="bg-primary-200 object-contain opacity-95"
            />
         </div>

         <div className="grid grid-rows-[1.7fr_1fr] 2xl:gap-1 px-4 py-3 text-center">
            <h2
               className={`font-semibold text-primary-900 2xl:leading-5.5 ${
                  name.length > 28 ? 'text-sm lg:text-lg' : 'text-lg lg:text-xl'
               }`}
            >
               {' '}
               {name.length > 41 ? `${name.slice(0, 42)}...` : name}
            </h2>

            <span className="text-xl md:text-2xl font-semibold text-primary-800">
               {formatCurrency(price)}
            </span>
         </div>
      </Link>
   );
}

export default Trending;
