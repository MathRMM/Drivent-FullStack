import{ useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useTicketsTypes from '../../../hooks/api/useTicketsTypes';
import useEnrollment from '../../../hooks/api/useEnrollment';
import ModalityOption from '../../../components/Payment/ModalityOption';
import AccommodationOption from '../../../components/Payment/AccommodationOption';
import TicketConfirmation from '../../../components/Payment/TicketConfirmation';

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

  function calculatePrices() {
    const online = ticketsTypes?.find(type => type.isRemote);
    const presential = ticketsTypes?.find(type => !type.isRemote && !type.includesHotel);
    const presentialHotel = ticketsTypes?.find(type => !type.isRemote && type.includesHotel);
    
    return {
      online: online?.price,
      presential: presential?.price,
      hotel: presentialHotel?.price - presential?.price,
      noHotel: 0
    };
  }

  function calculateTotalPrice() {
    let price = 0;

    if(ticketInfo.modality === 'Online') {
      price += prices.online;
    } else {
      price += prices.presential;
    }

    if(ticketInfo.accommodation === 'Com Hotel') {
      price += prices.hotel;
    }

    return price;
  }

  function createTicket() {
    let ticketType = {
      isRemote: false,
      includesHotel: false
    };

    if(ticketInfo.modality === 'Online') {
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

  useEffect(() => {
    setPrices(calculatePrices());
  }, [ticketsTypes]);

  useEffect(() => {
    if(ticketInfo.modality && ticketInfo.accommodation) {
      const price = calculateTotalPrice();
      setTotalPrice(price);
    }
  }, [ticketInfo]);
  
  return (
    <>
      <ModalityOption prices={prices} ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />

      {ticketInfo.modality && (
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
