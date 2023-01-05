
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useRoomOccupancy from '../../../hooks/api/useRoomOccupancy';

export default function AvailableRooms({ rooms /*, hotelId */  }) {
  const [bookingData, setBookingData] = useState('');
 
  function capacitiesSum() {
    const particalCount = rooms.map((value) => {
      return value.capacity;
    });
    const sum = particalCount.reduce((acc, capacity) => acc + capacity, 0);
    return sum;
  };
 
  useEffect(() => {
    if(rooms) {
      setBookingData(capacitiesSum());
    };
  }, [rooms]);

  return rooms ? <AccommodationsWrapper> <h5>Vagas Disponíveis</h5><span>{ bookingData }</span> </AccommodationsWrapper> : <span>Erro ao carregar as vagas</span>;
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
