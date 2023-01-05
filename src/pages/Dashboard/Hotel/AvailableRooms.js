
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useBookingList from '../../../hooks/api/useBookingList';

export default function AvailableRooms({ rooms }) {
  const [bookingData, setBookingData] = useState('');
  const [refresh, setRefresh] = useState(false);
  
  const bookingsOfAllHotels = useBookingList().booking; 
  useEffect(() => {
    if(bookingsOfAllHotels === null);
    console.log(bookingsOfAllHotels);
    setRefresh(true);
  }, [refresh]);
  
  function capacitiesSum() { //soma das capacidades por hotels
    const capacitiesPerHotel = rooms.map((value) => {
      return value.capacity;
    });
    const hotelId = rooms.map((value) => {return value.hotelId;})[0]; //Sempre virá o mesmo id
  
    const bookingsMade = bookingsOfAllHotels.filter((booking) => booking.hotelId == hotelId);

    const hotelCapacity = capacitiesPerHotel.reduce((acc, capacity) => acc + capacity, 0);
    const total = hotelCapacity - bookingsMade.length;
    
    return total;
  };

  useEffect(() => {
    if(bookingsOfAllHotels) {
      setBookingData(capacitiesSum());
    };
  }, [bookingsOfAllHotels]);

  return bookingData ? <AccommodationsWrapper> <h5>Vagas Disponíveis</h5><span>{ bookingData }</span> </AccommodationsWrapper> : <span>Erro ao carregar as vagas</span>;
};

const AccommodationsWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  margin-left: 10px;

  h5 {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
    margin-bottom: 4px;
  }

  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
  }

`;
