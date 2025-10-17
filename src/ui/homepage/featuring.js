import { IoCheckmarkOutline } from 'react-icons/io5';
import { PiLeafLight, PiTruckLight } from 'react-icons/pi';

function Featuring() {
   return (
      <div className="py-8 2xl-reverse:mx-160 mx-120 2xl:mx-82 xl:mx-52 lg:mx-44 md:mx-0 md:rounded-none rounded-xl flex justify-center items-center gap-24 bg-primary-900 md:text-center lg:gap-16 md:gap-14 lg:py-6 sm:gap-8 xs:gap-4 translate-y-[50%] md:translate-y-0">
         <Feature
            icon={
               <PiLeafLight className="size-16 2xl:size-12 md:size-14 text-primary-50" />
            }
            title="Premium materials"
         />
         <Feature
            icon={
               <PiTruckLight className="size-16 2xl:size-12 md:size-14 text-primary-50" />
            }
            title="Fast delivery"
         />
         <Feature
            icon={
               <IoCheckmarkOutline className="size-16 2xl:size-12 md:size-14 text-primary-50" />
            }
            title="14-Day guarantee"
         />
      </div>
   );
}

function Feature({ icon, title }) {
   return (
      <div className="flex flex-col gap-2 items-center text-primary-50 xs:gap-2">
         {icon}
         <h2 className="text-xl md:text-2xl xs:text-2xl text-center">
            {title}
         </h2>
      </div>
   );
}

export default Featuring;
