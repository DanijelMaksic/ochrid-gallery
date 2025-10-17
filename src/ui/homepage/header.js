import Logo from '@/src/ui/layout-components/logo';
import Navigation from '@/src/ui/layout-components/navigation';

function Header() {
   return (
      <header className="flex items-center justify-between px-12 2xl:px-8 py-4 2xl:py-3 bg-primary-100 md:hidden">
         <Logo />
         <Navigation />
      </header>
   );
}

export default Header;
