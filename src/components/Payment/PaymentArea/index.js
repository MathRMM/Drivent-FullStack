import { ChosenTicket } from '../../../components/Payment/PaymentArea/ChosenTicket';
import CreditCard from './CreditCard';
import useTicket from '../../../hooks/api/useTicket';

export default function PaymentArea({ setStep }) {
  const ticket = useTicket().ticket;

  return (
    <>
      <ChosenTicket ticket={ticket} />
      <CreditCard ticket={ticket}/>
    </>
  );
}
