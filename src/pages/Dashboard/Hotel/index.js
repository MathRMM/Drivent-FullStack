import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { steps, ticketStatus, ticketType } from '../../../utils/hotelsUtils';
import useTicket from '../../../hooks/api/useTicket';
import { CannotBookingMessageWrapper } from '../../../components/Hotels/cannotBookingMessageWrapper';
import HotelPage from '../Hotel/HotelPage';
import useBooking from '../../../hooks/api/useBooking';
import BookingInfo from '../../../components/Booking/BookingInfo';

export default function Hotels() {
  const [step, setStep] = useState(steps.paymentRequired);
  const { getTicket } = useTicket();
  const { getBooking } = useBooking();

  useEffect(async() => {
    const ticket = await getTicket();
    
    if(ticket) {
      if(ticket.status === ticketStatus.reserved) {
        setStep(steps.paymentRequired);
      } else if(ticket.ticketTypeId === ticketType.online || ticket.ticketTypeId === ticketType.noHotel) {
        setStep(steps.validateBooking);
      }
      else {
        setStep(steps.hotels);
      }
    }

    const booking = await getBooking();
    
    if(booking) {
      setStep(steps.summary);
    }
  }, []);

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
        <HotelPage setStep={setStep}/>
      )}

      {step === steps.summary && (
        <BookingInfo setStep={setStep}/>
      )}    
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
