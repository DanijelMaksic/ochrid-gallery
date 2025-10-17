import { signInAction } from '@/src/lib/actions';

export const metadata = {
   title: 'Login',
};

function Page() {
   return (
      <div className="flex flex-col gap-10 mt-32 md:mt-44 sm:mt-52 mb-120 items-center">
         <h2 className="text-5xl 2xl:text-[2.5rem] font-semibold">
            Sign in to proceed
         </h2>

         <form action={signInAction}>
            <button className="flex items-center gap-6 text-lg sm:text-xl border-2 border-primary-300 px-7 py-3 font-semibold text-primary-800 rounded-md hover:bg-primary-50 transition-custom">
               <img
                  src="https://authjs.dev/img/providers/google.svg"
                  className="opacity-90"
                  alt="Google logo"
                  height="24"
                  width="24"
               />
               <span>Continue with Google</span>
            </button>
         </form>
      </div>
   );
}

export default Page;
