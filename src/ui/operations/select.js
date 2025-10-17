'use client';

function Select({ options, value, handleSort }) {
   return (
      <select
         value={value}
         onChange={handleSort}
         aria-label="Sort Button"
         className="text-lg 2xl:text-base lg:text-lg px-3 py-[0.56rem] 2xl:py-[0.40rem] lg:py-[0.58rem] sm:py-[0.54rem] border-2 border-primary-300 bg-primary-0 font-semibold rounded-md transition-custom rounded-l-none outline-none"
      >
         {options.map((option) => (
            <option value={option.value} key={option.value}>
               {option.label}
            </option>
         ))}
      </select>
   );
}

export default Select;
