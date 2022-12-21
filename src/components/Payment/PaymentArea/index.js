import { ChosenTicket } from '../../../components/Payment/PaymentArea/ChosenTicket';
import CreditCard from './CreditCard';
import useTicket from '../../../hooks/api/useTicket';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';

export default function PaymentArea({ setStep }) {
  return (
    <>
      <ChosenTicket/>
      <CreditCard setStep={setStep} />
    </>
  );
}
