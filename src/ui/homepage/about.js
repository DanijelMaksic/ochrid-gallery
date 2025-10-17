import { EB_Garamond } from 'next/font/google';

const garamond = EB_Garamond({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400', '500', '700'],
});

function About() {
   return (
      <div className="pt-24 flex flex-col justify-center items-center gap-10 2xl-reverse:px-160 px-110 2xl:px-82 xl:px-52 lg:px-44 md:px-20 md:pb-24 sm:px-12 xs:px-6">
         <h2
            className={`text-5xl font-bold text-primary-950 text-center md:text-6xl xs:text-5xl ${garamond.className}`}
         >
            Welcome to the Ochrid Gallery!
         </h2>

         <div className="flex flex-col gap-8 text-2xl 2xl:text-xl text-center md:text-3xl xs:text-2xl">
            <p>
               Ochrid Gallery specializes in selling Orthodox Christian icons.
               Gallery was founded in 2021; at first we opened our store in
               Dallas, Texas. As time passed, we decided to also open our
               digital store, where people from all around the US and the world
               could order icons.
            </p>
            <p>
               Our digital storefront makes it easy to browse and buy our icons.
               Currently, we only sell icons, but the plan is to expand our
               selection of products with Orthodox-themed paintings in the
               future.
            </p>
            <p>For more practical information, consult the FAQ down below.</p>
         </div>
      </div>
   );
}

export default About;
