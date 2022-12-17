import{ useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TicketsPage from './TicketPage';

export default function Payment() {
  const steps = {
    ticket: 1,
    payment: 2,
    confirmation: 3,
  };
  const [step, setStep] = useState(steps.ticket);
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {step === steps.ticket && (
        <>
          <TicketsPage setStep={setStep} />
        </>
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
