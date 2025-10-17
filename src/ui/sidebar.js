'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { push as Menu } from 'react-burger-menu';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaHouse, FaImagePortrait, FaUser } from 'react-icons/fa6';

import '../../app/sidebar.css';

function Sidebar() {
   const [isOpen, setIsOpen] = useState(false);
   const [isMedium, setIsMedium] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const mediaQueryMedium = window.matchMedia('(max-width: 768px)');
      const mediaQueryMobile = window.matchMedia('(max-width: 450px)');

      setIsMedium(mediaQueryMedium.matches);
      setIsMobile(mediaQueryMobile.matches);
   }, [setIsMedium, setIsMobile]);

   function handleStateChange(state) {
      setIsOpen(state.isOpen);
   }

   function handleClose() {
      setIsOpen(false);
   }

   const menuItemStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      padding: isMobile ? '1.1rem 0.4rem' : '1.3rem 1rem',
      gap: 16,
      fontSize: isMobile && '1.4rem',
   };

   if (isMedium)
      return (
         <Menu
            isOpen={isOpen}
            right
            onStateChange={handleStateChange}
            customBurgerIcon={
               <RxHamburgerMenu className="size-10 bg-primary-50 rounded-full p-3 border border-primary-800 shadow-lg" />
            }
            width={isMobile ? '60%' : '40%'}
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            customCrossIcon={
               <IoMdClose fill="#fcf9f6" style={{ width: 40, height: 40 }} />
            }
            className="mb-menu"
         >
            <Link
               onClick={handleClose}
               className="menu-item"
               style={menuItemStyles}
               href={'/'}
            >
               <FaHouse className={`${isMobile && 'size-6'}`} />
               <span>Home</span>
            </Link>

            <Link
               onClick={handleClose}
               className="menu-item"
               style={menuItemStyles}
               href={'/items'}
            >
               <FaImagePortrait className={`${isMobile && 'size-6'}`} />
               <span>Icons</span>
            </Link>

            <Link
               onClick={handleClose}
               className="menu-item"
               style={menuItemStyles}
               href={'/account'}
            >
               <FaUser className={`${isMobile && 'size-6'}`} />
               <span>Account</span>
            </Link>

            <Link
               onClick={handleClose}
               className="menu-item"
               style={menuItemStyles}
               href={'/cart'}
            >
               <FaShoppingCart className={`${isMobile && 'size-6'}`} />
               <span>Cart</span>
            </Link>
         </Menu>
      );
}

export default Sidebar;
