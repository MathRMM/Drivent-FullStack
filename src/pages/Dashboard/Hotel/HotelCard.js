
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useRooms from '../../../hooks/api/useRooms';
import { capacityText } from '../../../utils/roomsUtils';
import AvailableRooms from '../Hotel/AvailableRooms';

export default function HotelCard({ hotel }) {
  const [roomData, setRoomData] = useState([]);
  const [accommodationType, setAccommodationType] = useState('');
  const [roomVacancies, setRoomVacancies] = useState([]); 

  const rooms = useRooms(hotel.hotelId).rooms;

  function getTextCapacity(capacity) {
    return capacityText[capacity];
  };

  function getRoomCapacity() {
    const capacities = rooms.Rooms.map((room) => {
      return getTextCapacity(room.capacity);
    }); 
    return ([...new Set(capacities)]);
  };
  
  function handleCapacitiesText(capacities) {
    capacities.reverse();
    const str = capacities.join(', ');
    const lastIndex = str.lastIndexOf(',');  

    if(lastIndex > -1) {
      const replacement = ' e';
      const replaced = str.substring(0, lastIndex) + replacement + str.substring(lastIndex + 1);
      return replaced;
    }
    return capacities;
  };

  useEffect(() => {
    if(rooms) {
      const roomsType = getRoomCapacity();
      setRoomData(handleCapacitiesText(roomsType));
      setRoomVacancies(rooms.Rooms);
    };
  }, [rooms]);

  return roomVacancies ? <Card > <img src={hotel.hotelImage} /> <h6>{hotel.hotelName}</h6> <AccommodationsWrapper> <h5>Tipos de Acomodação:</h5><h6>{roomData}</h6> </AccommodationsWrapper> {roomVacancies ? <AvailableRooms rooms={roomVacancies} /> : <></>} </Card> : <>Erro</>;
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 196px;
  height: 264px;
  align-items: center;
  
  background-color: #EBEBEB;
  border-radius: 10px;
 
  margin-right: 20px;
  padding-left: 14px;
  padding-right: 14px;
  cursor: pointer;

  h6 {
    font-size: 20px;
    color: #343434;
  }

  img {
    margin: 16px 0 10px 0;
    width: 168px;
    height: 109px;
    object-fit: fill;
    border-radius: 5px;
    background-color: pink;
  }  

`;

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

  h6 {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
  }

`;
