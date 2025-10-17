import { auth } from '@/src/lib/auth';

async function UserPreview() {
   const session = await auth();

   return (
      <>
         {session?.user?.name ? (
            <div className="flex gap-3 2xl:gap-2 items-center mr-3">
               <img
                  className="h-8 2xl:h-7 rounded-full opacity-95"
                  referrerPolicy="no-referrer"
                  src={session?.user?.image}
                  alt={session?.user?.name}
               />
               <span>{session?.user.name}</span>
            </div>
         ) : (
            ''
         )}
      </>
   );
}

export default UserPreview;
