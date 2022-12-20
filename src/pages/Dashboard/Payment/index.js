import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import useTicket from '../../../hooks/api/useTicket';
import { status, steps } from '../../../utils/ticketUtils';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useLocalStorage from '../../../hooks/useLocalStorage';

import TicketsPage, { Subtitle } from './TicketPage';
import { NoEnrollmentMessageWrapper } from '../../../components/Payment/noEnrollmentMessageWrapper';
import PaymentArea from '../../../components/Payment/PaymentArea';

export default function Payment() {
  const enrollment = useEnrollment().enrollment;
  const [step, setStep] = useState(steps.completeEnrollment);
  const ticket = useLocalStorage('ticket', false)[0] || useTicket().ticket;
  console.log(ticket);

  useEffect(() => {
    if (enrollment) {
      if(ticket) {
        if(ticket.status === status.reserved) {
          setStep(steps.payment);
        } else {
          setStep(step.confirmation);
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

      {step === steps.confirmation && <Subtitle>Pagamento realizado</Subtitle>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px !important;
`;

