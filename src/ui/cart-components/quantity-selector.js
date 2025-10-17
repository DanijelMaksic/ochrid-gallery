import { LuMinus, LuPlus } from 'react-icons/lu';

function QuantitySelector({
   inStock,
   count,
   setCount,
   currentItemId,
   currentItem,
   cartIDs,
}) {
   return (
      <div className="flex flex-col gap-2 md:gap-3 xs:gap-2 xs:mt-4">
         <span
            className={`font-bold text-2xl 2xl:text-xl lg:text-2xl md:text-3xl xs:text-2xl ${
               !inStock || cartIDs.includes(currentItemId)
                  ? 'pointer-events-none opacity-50'
                  : ''
            }`}
         >
            Quantity
         </span>

         <div
            aria-label="Decrease Quanitity Button"
            className={`flex items-center gap-2 md:gap-3 ${
               !inStock || cartIDs.includes(currentItemId)
                  ? 'pointer-events-none opacity-50'
                  : ''
            }`}
         >
            {count <= 1 ? (
               <button className="bg-primary-100 text-2xl 2xl:text-xl lg:text-2xl md:text-3xl xs:text-2xl rounded-md p-3 md:p-4 xs:p-3 hover:bg-primary-200 transition-custom opacity-50 pointer-events-none">
                  <LuMinus />
               </button>
            ) : (
               <button
                  aria-label="Decrease Quanitity Button"
                  className="bg-primary-100 text-2xl 2xl:text-xl lg:text-2xl md:text-3xl xs:text-2xl md:p-4 rounded-md p-3 xs:p-3 hover:bg-primary-200 transition-custom"
                  onClick={() => setCount?.(count - 1)}
               >
                  <LuMinus />
               </button>
            )}

            <span className="bg-primary-100 text-2xl 2xl:text-xl lg:text-2xl md:text-3xl xs:text-2xl md:py-[0.8rem] xs:py-[0.5rem] rounded-md py-[0.5rem] w-14 2xl:w-12 lg:w-13 md:w-16 xs:w-13 text-center">
               {count}
            </span>

            {count === currentItem?.quantity ? (
               <button
                  aria-label="Increase Quanitity Button"
                  className="bg-primary-100 text-2xl 2xl:text-xl lg:text-2xl xs:text-2xl md:text-3xl rounded-md p-3 md:p-4 xs:p-3  hover:bg-primary-200 transition-custom opacity-50 pointer-events-none"
               >
                  <LuPlus />
               </button>
            ) : (
               <button
                  aria-label="Increase Quanitity Button"
                  className="bg-primary-100 text-2xl 2xl:text-xl lg:text-2xl md:p-4 md:text-3xl xs:text-2xl xs:p-3 rounded-md p-3 hover:bg-primary-200 transition-custom"
                  onClick={() => setCount?.(count + 1)}
               >
                  <LuPlus />
               </button>
            )}
         </div>
      </div>
   );
}

export default QuantitySelector;
