import { ChosenTicket } from '../../../components/Payment/PaymentArea/ChosenTicket';
import CreditCard from './CreditCard';

export default function PaymentArea({ ticket }) {
  return (
    <>
      <ChosenTicket ticket={ticket} />
      <CreditCard />
    </>
  );
}
