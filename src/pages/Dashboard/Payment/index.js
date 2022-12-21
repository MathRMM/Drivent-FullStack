import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import useTicket from '../../../hooks/api/useTicket';
import { status, steps } from '../../../utils/ticketUtils';
import useEnrollment from '../../../hooks/api/useEnrollment';
import UserContext from '../../../contexts/UserContext';

import TicketsPage, { Subtitle } from './TicketPage';
import { NoEnrollmentMessageWrapper } from '../../../components/Payment/noEnrollmentMessageWrapper';
import PaymentArea from '../../../components/Payment/PaymentArea';
import PaymentConfirm from '../../../components/Payment/PaymentArea/PaymentConfirm';

export default function Payment() {
  const enrollment = useEnrollment().enrollment;
  const [step, setStep] = useState(steps.completeEnrollment);
  const { ticket } = useTicket();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (enrollment) {
      if (ticket) {
        setUserData({ ...userData, ticket });
        if (ticket.status === status.reserved) {
          setStep(steps.payment);
        } else {
          setStep(steps.confirmation);
        }
      } else setStep(steps.ticket);
    }
  }, [enrollment, ticket]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {step === steps.completeEnrollment && (
        <NoEnrollmentMessageWrapper>
          <Subtitle>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Subtitle>
        </NoEnrollmentMessageWrapper>
      )}

      {step === steps.ticket && <TicketsPage setStep={setStep} />}

      {step === steps.payment && (
        <>
          <PaymentArea setStep={setStep}/>
        </>
      )}

      {step === steps.confirmation && <PaymentConfirm />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px !important;
`;
