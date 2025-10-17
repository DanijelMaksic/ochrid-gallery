'use client';

import { useTransition } from 'react';
import { CgSpinner } from 'react-icons/cg';

function DeleteAddress({ onClose, onDelete }) {
   const [isPending, startTransition] = useTransition();

   function handleDelete() {
      startTransition(() => onDelete());
   }

   return (
      <div className="flex flex-col gap-8 2xl:gap-6 px-14 md:px-12 py-10 2xl:py-8 rounded-lg bg-primary-0 w-110 2xl:w-100 xs:w-90">
         <h2 className="text-3xl 2xl:text-2xl font-semibold border-b-2 border-primary-400 pb-6 2xl:pb-4  text-center">
            Are you sure you want to delete this address?
         </h2>

         <div className="flex gap-10 text-xl justify-center">
            <button
               onClick={() => onClose?.()}
               className={`px-6 py-2 2xl:py-1.5 rounded-md border-2 border-secondary border-primary-400 hover:bg-primary-100 transition-text ${
                  isPending && 'pointer-events-none opacity-60'
               }`}
            >
               Cancel
            </button>

            <button
               onClick={handleDelete}
               className={`bg-primary-800 text-primary-50 py-2 rounded-md hover:bg-primary-200 hover:text-primary-900 transition-text flex items-center gap-1 2xl:py-1.5 ${
                  isPending ? 'px-9.5 opacity-60 pointer-events-none' : 'px-6'
               }`}
            >
               {isPending ? <CgSpinner className="size-7 rotate" /> : 'Delete'}
            </button>
         </div>
      </div>
   );
}

export default DeleteAddress;
