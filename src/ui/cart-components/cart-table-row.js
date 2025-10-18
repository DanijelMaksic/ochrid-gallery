'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { AnimatePresence } from 'motion/react';
import { formatCurrency } from '@/src/utils/helpers';

import ModalWindow from '@/src/ui/cart-components/modal-window';
import DeleteCartItem from '@/src/ui/cart-components/delete-cart-item';
import CartQuantitySelector from '@/src/ui/cart-components/cart-quantity-selector';

function CartTableRow({ cartData, items, cart, setCart, type }) {
   const [isOpenModal, setIsOpenModal] = useState(false);

   const [isSmall, setIsSmall] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const mediaQuerySmall = window.matchMedia('(max-width: 640px)');
      const mediaQueryMobile = window.matchMedia('(max-width: 450px)');

      setIsSmall(mediaQuerySmall.matches);
      setIsMobile(mediaQueryMobile.matches);
   }, [setIsSmall, setIsMobile]);

   const [item] = items?.filter((item) => cartData.itemId === item.id);

   const { name, image, id, slug } = item;

   if (type === 'modify' && !isSmall && !isMobile)
      return (
         <div
            role="row"
            className="grid grid-cols-[1fr_1.8fr_1fr_0.5fr_0.1fr] gap-12 py-2 border-b-2 border-primary-200  transition-custom items-center"
         >
            <Link
               href={`/items/${slug}`}
               className="relative flex items-center justify-center bg-primary-200 rounded-sm overflow-hidden transition-custom border-2 border-primary-400 h-26 w-22 2xl:h-24 2xl:w-20 opacity-95 hover:opacity-85 transition duration-200"
            >
               <Image
                  src={image}
                  alt={name}
                  fill
                  className="opacity-95 object-contain"
               />
            </Link>

            <Link
               href={`/items/${slug}`}
               className={`underlined-text text-left ${
                  name.length > 47
                     ? 'text-xl 2xl:text-lg'
                     : 'text-2xl 2xl:text-xl'
               }`}
            >
               {name.length > 72 ? `${name.slice(0, 73)}...` : name}
            </Link>

            <CartQuantitySelector
               cart={cart}
               cartData={cartData}
               setCart={setCart}
               currentItem={item}
               type={type}
            />

            <span>{formatCurrency(cartData.total)}</span>

            <button
               onClick={() => setIsOpenModal(true)}
               className="text-xl bg-primary-800 text-primary-50 rounded-md text-center p-2 2xl:p-1.5 lg:p-2 hover:bg-primary-900 transition-custom"
            >
               <IoMdClose />
            </button>

            <AnimatePresence>
               {isOpenModal && (
                  <ModalWindow onClose={() => setIsOpenModal(false)}>
                     <DeleteCartItem
                        onClose={() => setIsOpenModal(false)}
                        currentItemId={id}
                        cart={cart}
                        setCart={setCart}
                     />
                  </ModalWindow>
               )}
            </AnimatePresence>
         </div>
      );

   if (type === 'modify' && !isMobile && isSmall)
      return (
         <div
            role="row"
            className="grid grid-cols-[1fr_3fr_0.5fr_0.1fr] gap-12 py-2 border-b-2 border-primary-200  transition-custom items-center"
         >
            <Link
               href={`/items/${slug}`}
               className="relative flex items-center justify-center bg-primary-200 rounded-sm overflow-hidden transition-custom border-2 border-primary-400 h-26 w-22 opacity-95 hover:opacity-85 transition duration-200"
            >
               <Image
                  src={image}
                  alt={name}
                  fill
                  className="opacity-95 object-contain"
               />
            </Link>

            <div className="flex flex-col gap-1">
               <Link
                  href={`/items/${slug}`}
                  className={`underlined-text text-left ${
                     name.length > 47 ? 'text-xl' : 'text-2xl'
                  }`}
               >
                  {name.length > 72 ? `${name.slice(0, 73)}...` : name}
               </Link>

               <CartQuantitySelector
                  cart={cart}
                  cartData={cartData}
                  setCart={setCart}
                  currentItem={item}
                  type={type}
               />
            </div>

            <span>{formatCurrency(cartData.total)}</span>

            <button
               onClick={() => setIsOpenModal(true)}
               className="text-xl bg-primary-800 text-primary-50 rounded-md text-center p-2 hover:bg-primary-900 transition-custom"
            >
               <IoMdClose />
            </button>

            <AnimatePresence>
               {isOpenModal && (
                  <ModalWindow onClose={() => setIsOpenModal(false)}>
                     <DeleteCartItem
                        onClose={() => setIsOpenModal(false)}
                        currentItemId={id}
                        cart={cart}
                        setCart={setCart}
                     />
                  </ModalWindow>
               )}
            </AnimatePresence>
         </div>
      );

   if (type === 'modify' && isMobile)
      return (
         <div
            role="row"
            className="grid grid-cols-[0.8fr_3fr_0.1fr] gap-5 py-2 border-b-2 border-primary-200  transition-custom items-center"
         >
            <Link
               href={`/items/${slug}`}
               className="relative flex items-center justify-center bg-primary-200 rounded-sm overflow-hidden transition-custom border-2 border-primary-400 h-26 w-22 opacity-95 hover:opacity-85 transition duration-200"
            >
               <Image
                  src={image}
                  alt={name}
                  fill
                  className="opacity-95 object-contain"
               />
            </Link>

            <div className="flex flex-col gap-1">
               <Link
                  href={`/items/${slug}`}
                  className={`underlined-text text-left ${
                     name.length > 30 ? 'text-xl' : 'text-2xl'
                  }`}
               >
                  {name.length > 32 ? `${name.slice(0, 33)}...` : name}
               </Link>

               <span>{formatCurrency(cartData.total)}</span>

               <CartQuantitySelector
                  cart={cart}
                  cartData={cartData}
                  setCart={setCart}
                  currentItem={item}
                  type={type}
               />
            </div>

            <button
               onClick={() => setIsOpenModal(true)}
               className="text-xl bg-primary-800 text-primary-50 rounded-md text-center p-2 hover:bg-primary-900 transition-custom"
            >
               <IoMdClose />
            </button>

            <AnimatePresence>
               {isOpenModal && (
                  <ModalWindow onClose={() => setIsOpenModal(false)}>
                     <DeleteCartItem
                        onClose={() => setIsOpenModal(false)}
                        currentItemId={id}
                        cart={cart}
                        setCart={setCart}
                     />
                  </ModalWindow>
               )}
            </AnimatePresence>
         </div>
      );

   if (type === 'readOnly' && !isMobile)
      return (
         <div
            role="row"
            className="grid grid-cols-[1fr_5fr_1fr_0.5fr_0.1fr] gap-12 py-2 border-b-2 border-primary-200  transition-custom items-center"
         >
            <Link
               href={`/items/${slug}`}
               className="relative flex items-center justify-center bg-primary-200 rounded-sm overflow-hidden transition-custom border-2 border-primary-400 h-26 w-22 2xl:h-24 2xl:w-20 opacity-95 hover:opacity-85 transition duration-200"
            >
               <Image
                  src={image}
                  alt={name}
                  fill
                  className="opacity-95 object-contain"
               />
            </Link>

            <Link
               href={`/items/${slug}`}
               className={`underlined-text text-left ${
                  name.length > 47
                     ? 'text-xl 2xl:text-lg'
                     : 'text-2xl 2xl:text-xl'
               }`}
            >
               {name.length > 72 ? `${name.slice(0, 73)}...` : name}
            </Link>

            <CartQuantitySelector
               cart={cart}
               cartData={cartData}
               setCart={setCart}
               currentItem={item}
               type={type}
            />

            <span>{formatCurrency(cartData.total)}</span>

            <span></span>
         </div>
      );

   if (type === 'readOnly' && isMobile)
      return (
         <div
            role="row"
            className="grid grid-cols-[1fr_5fr] gap-12 py-2 border-b-2 border-primary-200  transition-custom items-center"
         >
            <Link
               href={`/items/${slug}`}
               className="relative flex items-center justify-center bg-primary-200 rounded-sm overflow-hidden transition-custom border-2 border-primary-400 h-26 w-22 2xl:h-24 2xl:w-20 opacity-95 hover:opacity-85 transition duration-200"
            >
               <Image
                  src={image}
                  alt={name}
                  fill
                  className="opacity-95 object-contain"
               />
            </Link>

            <div className="flex flex-col gap-1">
               <Link
                  href={`/items/${slug}`}
                  className={`underlined-text text-left ${
                     name.length > 47
                        ? 'text-xl 2xl:text-lg'
                        : 'text-2xl 2xl:text-xl'
                  }`}
               >
                  {name.length > 47 ? `${name.slice(0, 48)}...` : name}
               </Link>

               <div className="flex items-center gap-3">
                  <CartQuantitySelector
                     cart={cart}
                     cartData={cartData}
                     setCart={setCart}
                     currentItem={item}
                     type={type}
                  />

                  <span className="border-l-2 border-primary-300 pl-3">
                     {formatCurrency(cartData.total)}
                  </span>
               </div>
            </div>
         </div>
      );
}

export default CartTableRow;
