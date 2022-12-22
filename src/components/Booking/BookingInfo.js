import { useEffect } from 'react';
import { useState } from 'react';
import { capacityOptions, occupants } from '../../utils/bookingUtils';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { ConfirmationButton } from '../ConfirmationButton';
import useRoomOccupancy from '../../hooks/api/useRoomOccupancy';
import useBooking from '../../hooks/api/useBooking';

export default function BookingInfo() {
  const [capacity, setCapacity] = useState('');
  const [booked, setBooked] = useState(occupants.single);
  const booking = useBooking().booking;
  const roomOccupancy = useRoomOccupancy(booking?.Room.id).roomOccupancy;
  
  useEffect(() => {
    if(booking?.Room.capacity === 1) {
      setCapacity(capacityOptions.single);
    } else if(booking?.Room.capacity === 2) {
      setCapacity(capacityOptions.double);
    } else {
      setCapacity(capacityOptions.triple);
    }
  }, [booking]);

  useEffect(() => {
    if(roomOccupancy?.occupancy > 1) {
      setBooked(`${occupants.more} ${roomOccupancy.occupancy - 1}`);
    }
  }, [roomOccupancy]);

  return (
    <>
      <Subtitle variant="h6">Você já escolheu seu quarto:</Subtitle>

      <SummaryWrapper>
        <img src={booking?.Room.Hotel.image} alt='Hotel'/>

        <Typography variant='h6'>{booking?.Room.Hotel.name}</Typography>

        <Typography variant='body2'>Quarto reservado</Typography>
        <Typography variant='body2'>{`${booking?.Room.name} (${capacity})`}</Typography>

        <Typography variant='body2'>Pessoas no seu quarto</Typography>
        <Typography variant='body2'>{`${booked}`}</Typography>
      </SummaryWrapper>
      
      <ConfirmationButton type="submit" /*disabled={ saveTicketLoading } onClick={handleClick} */>
        <StyledTypography variant="body2">TROCAR DE QUARTO</StyledTypography>
      </ConfirmationButton>
    </>
  );
}

const Subtitle = styled(Typography)`
    margin-bottom: 14px!important;
    color: #8E8E8E;
`;

const StyledTypography = styled(Typography)`
    text-align: center!important;
    line-height: 1!important;
    font-size: 12px!important;
`;

const SummaryWrapper = styled.div`
  width: 196px;
  min-height: 264px;
  background-color: #FFEED2;
  border-radius: 10px;
  margin-bottom: 38px;
  display: flex;
  flex-direction: column;
  padding: 16px 14px 0 14px;

  img {
    border-radius: 5px;
    margin-bottom: 14px;
    width: 168px;
    height: 109px;
    object-fit: cover;
  }

  h6 {
    color: #343434;
    margin-bottom: 10px;
    line-height: 1;
    word-wrap: break-word;
  }

  p {
    font-size: 12px!important;
    font-weight: 700;
  }

  p:nth-child(2n) {
    font-weight: 400;
    margin-bottom: 14px
  }
`;
