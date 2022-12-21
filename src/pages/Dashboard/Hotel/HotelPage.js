import{ useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotels from '../../../hooks/api/useHotels';
import { Subtitle } from '../Payment/TicketPage';

export default function HotelPage() {
  const [hotelData, setHotelData] = useState([]);
  const hotelsInfo =  useHotels().hotels;
  const list = hotelsInfo;
    
  function listHotels() {
    const hotels = list.map((hotel) => {
      return  {
        hotelName: hotel.name, 
        hotelImage: hotel.image,
      };
    });
    
    return hotels; 
  };
  
  useEffect(() => {
    if(list) {
      const hotelInfo = listHotels();
      setHotelData(hotelInfo);
    };
  }, []);  
  
  return <> <Subtitle variant='h6'>Primeiro, escolha seu hotel</Subtitle>
    <CardsWrapper> 
      {hotelData.length !== 0 ? (hotelData.map((hotel) => <Card><h3>{hotel.hotelName}</h3> <img src={hotel.hotelImage} /> </Card> )) : <> Sem hotéis cadastrados no memento</> }
    </CardsWrapper>
  </>; 
};

const CardsWrapper = styled.div`
  width: auto;
  background-color: yellow;
`;
const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50px;
  height: 20px;
  background-color: aliceblue;
`;
