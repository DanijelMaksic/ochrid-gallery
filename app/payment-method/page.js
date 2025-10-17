import Summary from '@/src/ui/cart-components/summary';
import Progress from '@/src/ui/cart-components/progress';
import PaymentMethodForm from '@/src/ui/checkout-components/payment-method-form';

export const metadata = {
   title: 'Payment method',
};

async function Page() {
   return (
      <div>
         <Progress />
         <div className="grid grid-cols-[1fr_38rem] 2xl:grid-cols-[1fr_30rem] lg:grid-cols-1">
            <PaymentMethodForm />
            <Summary type="payment" />
         </div>
      </div>
   );
}

export default Page;
