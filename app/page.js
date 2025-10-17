import FAQ from '@/src/ui/homepage/faq';
import CTA from '@/src/ui/homepage/cta';
import About from '@/src/ui/homepage/about';
import Featuring from '@/src/ui/homepage/featuring';

// HOME PAGE
export default function Home() {
   return (
      <>
         <CTA />
         <About />
         <Featuring />
         <FAQ />
      </>
   );
}
