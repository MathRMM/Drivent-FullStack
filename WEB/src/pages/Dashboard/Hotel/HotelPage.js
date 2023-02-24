import{ useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotels from '../../../hooks/api/useHotels';
import HotelCard from '../Hotel/HotelCard';
import Rooms from '../../../components/Hotels/Rooms';
import Typography from '@material-ui/core/Typography';
import useBooking from '../../../hooks/api/useBooking';
 
export default function HotelPage({ setStep }) {
  const [hotelData, setHotelData] = useState([]);
  const [hotelId, setHotelId] = useState(null);
  const hotelsInfo =  useHotels().hotels;
  const list = hotelsInfo;
  const { getBooking } = useBooking();

  useEffect(async() => {
    const booking = await getBooking();

    if(booking) {
      setHotelId(booking.Room.Hotel.id);
    }
  }, []);

  function listHotels() {
    const hotels = list.map((hotel) => {
      return  {
        hotelName: hotel.name, 
        hotelImage: hotel.image,
        hotelId: hotel.id,
      };
    });
    
    return hotels;  
  };
  
  useEffect(() => {
    if(list) {
      const hotelInfo = listHotels();
      setHotelData(hotelInfo);
    };
  }, [list]);  

  return <> 
    <Subtitle variant='h6'>Primeiro, escolha seu hotel</Subtitle>
    
    <CardsWrapper> 
      {hotelData.length > 0 ? (hotelData.map((hotel, index) => 
        <HotelCard 
          key={index}
          hotel={hotel} 
          hotelId={hotelId}
          setHotelId={setHotelId}
        /> 
      )) : <> Sem hotéis cadastrados no momento</> } 
    </CardsWrapper>

    {hotelId && (
      <Rooms hotelId={hotelId} setStep={setStep}/>
    )}
  </>; 
};

const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  overflow-x: auto;
  margin-bottom: 40px;
  
  ::-webkit-scrollbar {
  width: 10px;
  height: 8px;
  
}
::-webkit-scrollbar-track {
  background: transparent;   
} 
::-webkit-scrollbar-thumb {
  background: #BEBDB8; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: lightgray; 
}
`;

const Subtitle = styled(Typography)`
    margin-bottom: 17px!important;
    color: #8E8E8E;
`;

export {
  Subtitle,
};
