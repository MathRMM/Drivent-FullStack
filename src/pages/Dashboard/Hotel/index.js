import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import  useHotels from '../../../hooks/api/useHotels';
import { steps, ticketStatus, ticketType } from '../../../utils/hotelsUtils';
import useTicket from '../../../hooks/api/useTicket';
import { CannotBookingMessageWrapper } from '../../../components/Hotels/cannotBookingMessageWrapper';
import useBooking from '../../../hooks/api/useBooking';
import BookingInfo from '../../../components/Booking/BookingInfo';
import HotelsWrapper from '../../../components/Hotels/HotelsWrapper';

export default function Hotels() {
  const { gethotelsData } = useHotels();
  const [data, setData] = useState([]);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [step, setStep] = useState(steps.paymentConfirmation);
  const ticket = useTicket().ticket;
  const booking = useBooking().booking;
  
  useEffect(() => {
    if(ticket && !booking) {
      if(ticket.status === ticketStatus.reserved) {
        setStep(steps.paymentRequired);
      } else if(ticket.ticketTypeId === ticketType.online || ticket.ticketTypeId === ticketType.noHotel) {
        setStep(steps.validateBooking);
      }
      else {
        setStep(steps.hotels);
      }
    }
  }, [ticket]);

  useEffect(() => {
    if(booking) {
      setStep(steps.summary);
    }
  }, [booking]);

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
        <HotelsWrapper setStep={setStep}/>
      )}

      {step === steps.summary && (
        <BookingInfo/>
      )}    
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
