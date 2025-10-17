'use client';

import { useState } from 'react';
import { EB_Garamond } from 'next/font/google';
import { accordionData } from '../../../src/utils/accordionData';

const garamond = EB_Garamond({
   subsets: ['latin'],
   display: 'swap',
   weight: '500',
});

function FAQ() {
   return (
      <section className="bg-primary-300 pb-8 pt-30 lg:pt-24 md:py-10">
         <div className="container 2xl-reverse:px-160 px-110 py-10 mx-auto 2xl:px-62 lg:px-28 md:px-20 sm:px-12 xs:px-6">
            <h1
               className={`text-4xl font-semibold md:text-5xl sm:text-center pb-4 ${garamond.className}`}
            >
               FAQ
            </h1>

            {accordionData.map(({ title, content }) => (
               <Accordion title={title} content={content} key={title} />
            ))}
         </div>
      </section>
   );
}

function Accordion({ title, content }) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <hr className="my-5 2xl:my-4  border-primary-600" />

         <div>
            <Title setIsOpen={setIsOpen} title={title} isOpen={isOpen} />

            {isOpen && <Content content={content} />}
         </div>

         <hr className="my-6 2xl:my-5 border-primary-600" />
      </>
   );
}

function Title({ setIsOpen, title, isOpen }) {
   return (
      <button
         onClick={() => setIsOpen((isOpen) => !isOpen)}
         className="flex items-center focus:outline-none text-left"
      >
         <span className="text-3xl xs:text-4xl w-3">{isOpen ? '-' : '+'}</span>
         <h1 className="mx-4 text-2xl md:text-3xl">{title}</h1>
      </button>
   );
}

function Content({ content }) {
   return (
      <div className="flex my-3 mx-10">
         <span className="border border-primary-600" />

         <p className="max-w-3xl text-lg px-4 md:text-2xl">{content}</p>
      </div>
   );
}

export default FAQ;
