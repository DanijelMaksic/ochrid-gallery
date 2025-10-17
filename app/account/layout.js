import SideNavigation from '@/src/ui/layout-components/side-navigation';

function AccountLayout({ children }) {
   return (
      <div className="relative grid grid-cols-[16rem_1fr] md:grid-cols-[1fr_9fr] xs:grid-cols-none h-full my-12 xs:my-0 xs:mb-4">
         <SideNavigation />

         <main className="px-60 2xl:px-20 md:px-14 pb-14 lg:pb-7 pt-2 xs:pt-6 xs:px-4 max-w-400">
            {children}
         </main>
      </div>
   );
}

export default AccountLayout;
