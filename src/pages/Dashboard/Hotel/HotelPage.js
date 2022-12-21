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
  //primeira renderizada vem vazia, verificar
  return <> <Subtitle variant='h6'>Primeiro, escolha seu hotel</Subtitle>
    <CardsWrapper> 
      {hotelData.length > 0 ? (hotelData.map((hotel) => <Card onClick={(() => alert('teste'))}> <img src={hotel.hotelImage} /> <h6>{hotel.hotelName}</h6> </Card> )) : <> Sem hotéis cadastrados no memento</> } 
    </CardsWrapper>
  </>; 
};

const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  overflow-x: auto;
`;

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
