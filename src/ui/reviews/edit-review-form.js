import { useActionState, useState } from 'react';

import { motion } from 'motion/react';
import { CgSpinner } from 'react-icons/cg';
import { editReviewAction } from '@/src/lib/actions';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

import FormRow from '@/src/ui/checkout-components/form-row';

function EditReviewForm({ onClose, review }) {
   const { username, title, content, recommended, id, item_id } = review;
   const [recommend, setRecommend] = useState(recommended);

   const [state, action, isPending] = useActionState(editReviewAction, {
      success: false,
      errors: {},
   });

   if (state.success) {
      onClose?.();
      state.success = false;
   }

   return (
      <form
         action={action}
         className="flex flex-col gap-8 xs:gap-4 px-14 sm:px-2 xs:px-0 py-10 xs:py-5 rounded-lg bg-primary-0"
      >
         <div
            className={`flex flex-col ${
               isPending && 'pointer-events-none opacity-60'
            }`}
         >
            <FormRow
               label="Username"
               error={
                  state?.errors?.username && (
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="text-[#CA3A3E] 2xl:text-lg"
                     >
                        {state?.errors?.username[0]}
                     </motion.p>
                  )
               }
            >
               <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={username}
                  className="border-2 border-primary-400 rounded-md px-4 py-1 focus-style transition-custom text-xl 2xl:text-lg w-130 xs:w-80"
               />
            </FormRow>

            <FormRow
               label="Title"
               error={
                  state?.errors?.title && (
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="text-[#CA3A3E] 2xl:text-lg"
                     >
                        {state?.errors?.title[0]}
                     </motion.p>
                  )
               }
            >
               <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={title}
                  className="border-2 border-primary-400 2xl:text-lg rounded-md px-4 py-1 focus-style transition-custom text-xl"
               />
            </FormRow>

            <FormRow
               label="Content"
               error={
                  state?.errors?.content && (
                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="text-[#CA3A3E] 2xl:text-lg"
                     >
                        {state?.errors?.content[0]}
                     </motion.p>
                  )
               }
            >
               <textarea
                  type="text"
                  id="content"
                  name="content"
                  defaultValue={content}
                  className="border-2 border-primary-400 2xl:text-lg rounded-md px-4 py-1 text-xl focus-style transition-custom no-spinners"
               />
            </FormRow>

            <FormRow>
               <div className="grid grid-cols-2 xs:grid-cols-1 gap-5 xs:gap-3 xs:mt-3 text-xl 2xl:text-lg font-semibold">
                  <button
                     type="button"
                     onClick={() => setRecommend(true)}
                     className={`border-2 rounded-md border-primary-400 px-6 py-3 2xl:py-2 2xl:px-4 flex items-center justify-center gap-1 2xl:gap-2 transition-custom  hover:border-primary-800 ${
                        recommend === true &&
                        'bg-primary-800 pointer-events-none border-primary-800 text-primary-0'
                     }`}
                  >
                     <IoIosCheckmarkCircleOutline className="size-7 2xl:size-6" />
                     <span>I recommend</span>
                  </button>

                  <button
                     type="button"
                     onClick={() => setRecommend(false)}
                     className={`border-2 rounded-md border-primary-400 px-6 py-3 2xl:py-2 2xl:px-4 flex items-center gap-1 2xl:gap-2 justify-center transition-custom  hover:border-primary-800 ${
                        recommend === false &&
                        'bg-primary-800 pointer-events-none border-primary-800 text-primary-0'
                     }`}
                  >
                     <IoCloseCircleOutline className="size-7 2xl:size-6" />
                     <span>I don&apos;t recommend</span>
                  </button>
               </div>
            </FormRow>
         </div>

         <input type="hidden" value={id} name="id" />

         <input type="hidden" name="recommended" value={recommend} />

         <input type="hidden" value={item_id} name="item_id" />

         <div
            className={`flex gap-10 text-2xl justify-center ${
               isPending && 'pointer-events-none opacity-60'
            }`}
         >
            <span></span>

            <div className="flex items-center gap-10 2xl:gap-8 pr-6">
               <button
                  onClick={() => onClose?.()}
                  className={`px-6 2xl:px-5 py-2  2xl:py-1.5 rounded-md border-2 border-secondary border-primary-400 text-2xl 2xl:text-xl hover:bg-primary-100 transition-text ${
                     isPending && 'pointer-events-none opacity-60'
                  }`}
               >
                  Cancel
               </button>

               <button
                  type="submit"
                  className={`bg-primary-900 text-primary-50 px-8 2xl:px-6 py-2.5 2xl:py-2 rounded-md hover:bg-primary-800 transition-text flex items-center gap-1 2xl:gap-2 w-min text-2xl 2xl:text-xl ${
                     isPending
                        ? 'opacity-60 pointer-events-none'
                        : 'px-8 py-2.5'
                  }`}
               >
                  {isPending ? (
                     <>
                        <CgSpinner className="rotate size-7 2xl:size-6" />
                        <span>Editing</span>
                     </>
                  ) : (
                     <span>Edit</span>
                  )}
               </button>
            </div>
         </div>
      </form>
   );
}

export default EditReviewForm;
