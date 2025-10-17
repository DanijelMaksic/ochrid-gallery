function StatTemplate({ item }) {
   const { icon, label, value, color } = item;
   return (
      <div className="bg-primary-100 rounded-xl grid grid-cols-[0.7fr_1fr] xs:grid-cols-none xs:flex xs:flex-col overflow-hidden gap-6 xs:gap-1">
         <span
            className={`${color} flex justify-center items-center lg:py-7 xs:py-5.5`}
         >
            {icon}
         </span>

         <div className="flex flex-col gap-1 lg:gap-0 justify-center xs:px-8 xs:py-3 xs:items-center">
            <span className="text-base font-semibold text-primary-800 uppercase">
               {label}
            </span>
            <span className="text-3xl font-semibold">
               {value < 1 ? <span>&mdash;</span> : value}
            </span>
         </div>
      </div>
   );
}

export default StatTemplate;
