import { ChosenTicket } from '../../../components/Payment/PaymentArea/ChosenTicket';
import CreditCard from './CreditCard';

export default function PaymentArea({ setStep }) {
  return (
    <>
      <ChosenTicket/>
      <CreditCard setStep={setStep} />
    </>
  );
}
