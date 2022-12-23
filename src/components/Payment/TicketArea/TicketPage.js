import{ useState, useEffect } from 'react';
import styled from 'styled-components';

import useTicketsTypes from '../../../hooks/api/useTicketsTypes';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { modality } from '../../../utils/ticketUtils';
import { calculatePrices, calculateTotalPrice } from '../../../hooks/useCalculator';

import Typography from '@material-ui/core/Typography';
import TicketConfirmation from './TicketConfirmation';
import ModalityOption from './ModalityOption';
import AccommodationOption from './AccommodationOption';

export default function TicketsPage({ setStep }) {
  const [prices, setPrices] = useState({
    online: 0,
    presential: 0,
    hotel: 0,
    noHotel: 0
  });
  const [ticketInfo, setTicketInfo] = useState({
    modality: false,
    accommodation: false
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const ticketsTypes = useTicketsTypes().ticketsTypes;
  const enrollment = useEnrollment().enrollment;
  const total = { prices, ticketInfo, modality };

  useEffect(() => {
    setPrices(calculatePrices(ticketsTypes));
  }, [ticketsTypes]);

  useEffect(() => {
    if(ticketInfo.modality && ticketInfo.accommodation) {
      const price = calculateTotalPrice(total);
      setTotalPrice(price);
    }
  }, [ticketInfo]);

  function createTicket() {
    let ticketType = {
      isRemote: false,
      includesHotel: false
    };

    if(ticketInfo.modality === modality.online) {
      ticketType.isRemote = true;
    }

    if(ticketInfo.accommodation === 'Com Hotel') {
      ticketType.includesHotel = true;
    }

    ticketType = ticketsTypes.find(info => info.isRemote === ticketType.isRemote && info.includesHotel === ticketType.includesHotel);

    return {
      status: 'RESERVED',
      ticketTypeId: ticketType.id,
      enrollmentId: enrollment.id,
      updatedAt: Date.now()
    };
  }
  
  return (
    <>
      <ModalityOption prices={prices} ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />

      {ticketInfo.modality !== modality.online && (
        <AccommodationOption prices={prices} ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
      )}

      {ticketInfo.accommodation && (
        <TicketConfirmation price={totalPrice.toString()} createTicket={createTicket} setStep={setStep} />
      )}
    </>
  );
}

const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 44px!important;
    
`;

const Subtitle = styled(Typography)`
    margin-bottom: 17px!important;
    color: #8E8E8E;
`;

export {
  OptionContainer,
  Subtitle
};
