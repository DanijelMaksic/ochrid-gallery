'use client';

function ClearCart({ onClose, setCart }) {
   function handleDelete() {
      setCart?.([]);
      onClose?.();
   }

   return (
      <div className="flex w-100 xs:w-90 flex-col gap-8 2xl:gap-6 px-14 md:px-12 py-10 2xl:py-8 rounded-lg bg-primary-0">
         <h2 className="text-3xl 2xl:text-2xl font-semibold border-b-2 border-primary-400 pb-6 2xl:pb-4 text-center">
            Are you sure you want to clear your cart?
         </h2>

         <div className="flex gap-10 text-xl justify-center">
            <button
               onClick={() => onClose?.()}
               className="px-6 2xl:px-5 2xl:py-1.5 py-2 rounded-md border-2 border-secondary border-primary-400 hover:bg-primary-100 transition-text"
            >
               Cancel
            </button>

            <button
               onClick={handleDelete}
               className={`bg-primary-800 text-primary-50 px-6 2xl:px-5 2xl:py-1.5 py-2 rounded-md hover:bg-primary-200 hover:text-primary-900 transition-text flex items-center gap-1`}
            >
               Delete
            </button>
         </div>
      </div>
   );
}

export default ClearCart;
