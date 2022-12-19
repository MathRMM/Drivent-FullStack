import{ useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TicketsPage, { Subtitle } from './TicketPage';
import useTicket from '../../../hooks/api/useTicket';
import { status, steps } from '../../../utils/ticketUtils';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { NoEnrollmentMessageWrapper } from '../../../components/Payment/noEnrollmentMessageWrapper';

export default function Payment() {
  const ticket = useTicket().ticket;
  const enrollment = useEnrollment().enrollment;
  const [step, setStep] = useState(steps.ticket);

  useEffect(() => {
    if(!enrollment) {
      setStep(steps.completeEnrollment);
    } else {
      setStep(steps.ticket);
    }
  }, [enrollment]);

  useEffect(() => {
    if(ticket) {
      if(ticket.status === status.reserved) {
        setStep(steps.payment);
      } else {
        setStep(step.confirmation);
      }
    }
  }, [ticket]);
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {step === steps.completeEnrollment && (
        <NoEnrollmentMessageWrapper>
          <Subtitle>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Subtitle>
        </NoEnrollmentMessageWrapper>
      )}

      {step === steps.ticket && (
        <TicketsPage setStep={setStep} />
      )}

      {step === steps.payment && (
        <></>
      )}

      {step === steps.confirmation && (
        <></>
      )}
    </> 
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px!important;
`;
