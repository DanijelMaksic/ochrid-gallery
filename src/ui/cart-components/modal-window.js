'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

import { motion } from 'motion/react';
import { HiXMark } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

function ModalWindow({ children, onClose }) {
   const ref = useRef();
   const pathname = usePathname();
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      function handleClick(e) {
         if (ref.current && !ref.current.contains(e.target)) {
            onClose?.();
         }
      }

      const handleEscape = (e) => {
         if (!ref.current) return;
         if (e.key === 'Tab') e.preventDefault();
         if (e.key === 'Escape') onClose?.();
      };

      document.addEventListener('click', handleClick, true);
      document.addEventListener('keydown', handleEscape, true);
      return () => {
         document.removeEventListener('click', handleClick, true);
         document.removeEventListener('keydown', handleEscape, true);
      };
   }, [onClose]);

   useEffect(() => {
      const mediaQueryMobile = window.matchMedia('(max-width: 450px)');

      setIsMobile(mediaQueryMobile.matches);
   }, [setIsMobile]);

   return createPortal(
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
         className="fixed top-0 left-0 w-[100%] h-screen bg-primary-800/10 z-10 backdrop-blur-sm transition-custom"
      >
         <div
            ref={ref}
            className="fixed top-[46%] left-[50%] translate-[-50%] shadow-2xl   transition-custom rounded-lg"
         >
            <button
               type="button"
               onClick={onClose}
               className={`absolute transition-text ${
                  pathname === '/account/address-book' && isMobile
                     ? 'left-0 top-0'
                     : 'right-2 top-2'
               } p-2 rounded-xl text-3xl text-primary-700 hover:bg-primary-100
               hover:text-primary-800
              `}
            >
               <HiXMark />
            </button>
            {children}
         </div>
      </motion.div>,
      document.body
   );
}

export default ModalWindow;
