import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TicketsPage from './TicketPage';
import useTicket from '../../../hooks/api/useTicket';
import { steps } from '../../../utils/ticketUtils';
import PaymentArea from '../../../components/Payment/PaymentArea';
import { Subtitle } from '../../../components/Enum/Texts';

export default function Payment() {
  const ticket = useTicket().ticket;
  const [step, setStep] = useState(steps.ticket);

  useEffect(() => {
    if (ticket) {
      if (ticket.status === 'RESERVED') {
        setStep(steps.payment);
      } else {
        setStep(steps.confirmation);
      }
    }
  }, [ticket]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {step === steps.ticket && (
        <>
          <TicketsPage setStep={setStep} />
        </>
      )}

      {step === steps.payment && (
        <>
          <PaymentArea ticket={ticket} />
        </>
      )}

      {step === steps.confirmation && (
        <Subtitle>
          Pagamento realizado
        </Subtitle>)}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px !important;
`;
