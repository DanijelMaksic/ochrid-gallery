'use client';

import { useOrder } from '@/src/contexts/order-context';
import { createContext, useContext, useState } from 'react';

const PaymentMethodContext = createContext();

function PaymentMethodProvider({ children }) {
   const { order } = useOrder();

   const [paymentMethod, setPaymentMethod] = useState(
      order.payment_method || null
   );
   const [paymentMethodError, setPaymentMethodError] = useState(null);

   return (
      <PaymentMethodContext.Provider
         value={{
            paymentMethod,
            setPaymentMethod,
            paymentMethodError,
            setPaymentMethodError,
         }}
      >
         {children}
      </PaymentMethodContext.Provider>
   );
}

function usePaymentMethod() {
   const context = useContext(PaymentMethodContext);
   if (context === undefined)
      throw new Error(
         'PaymentMethodContext was used outside of PaymentMethodContext.Provider'
      );
   return context;
}

export { PaymentMethodProvider, usePaymentMethod };
