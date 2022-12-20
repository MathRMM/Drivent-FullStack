import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import  useHotels from '../../../hooks/api/useHotels';
import { steps, ticketStatus, ticketType } from '../../../utils/hotelsUtils';
import useTicket from '../../../hooks/api/useTicket';
import { CannotBookingMessageWrapper } from '../../../components/Hotels/cannotBookingMessageWrapper';

export default function Hotels() {
  const { gethotelsData } = useHotels();
  const [data, setData] = useState([]);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [step, setStep] = useState(steps.paymentConfirmation);
  const ticket = useTicket().ticket;

  useEffect(() => {
    if(ticket) {
      console.log(ticket.status);
      if(ticket.status === ticketStatus.reserved) {
        console.log('entra');
        return setStep(steps.paymentRequired);
      } 
      if(ticket.ticketTypeId === ticketType.online || ticket.ticketTypeId === ticketType.noHotel) {
        console.log('entra, mas nao devia');
        return setStep(steps.validateBooking);
      }
      else {
        console.log('entra, mas nao devia mesmo');
        return setStep(steps.hotels);
      }
    }
  }, [ticket]);

  return( 
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      
      {step === steps.paymentRequired && (
        <CannotBookingMessageWrapper>
          <div><p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p></div>
        </CannotBookingMessageWrapper>
      )}

      {step === steps.validateBooking && (
        <CannotBookingMessageWrapper> 
          <span>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</span>
        </CannotBookingMessageWrapper>
      )}

      {step === steps.hotels && (
        <>Lista hotels</>
      )}
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
