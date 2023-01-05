import styled from 'styled-components';
import { Subtitle } from '../../pages/Dashboard/Hotel/HotelPage';
import { useState } from 'react';
import useHotel from '../../hooks/api/useHotel';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import useRoomOccupancy from '../../hooks/api/useRoomOccupancy';
import { findSelectedAndOccupiedVacancies, getVacancies, roomStatus, vacancyStatus } from '../../utils/roomsUtils';
import { ConfirmationButton } from '../ConfirmationButton';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import { toast } from 'react-toastify';
import { steps } from '../../utils/hotelsUtils';
import useBooking from '../../hooks/api/useBooking';

export default function Rooms({ hotelId, setStep }) {
  const { getHotelData } = useHotel();
  const { getBooking } = useBooking();
  const [rooms, setRooms] = useState([]);
  const [wasSelected, setWasSelected] = useState([]);
  const { saveBooking, saveBookingLoading } = useSaveBooking();
  const [currentRoom, setCurrentRoom] =useState({});
  const [bookParams, setBookParams] = useState({ 
    id: null, 
    roomId: null,
  });
  
  useEffect(async() => {
    const booking = await getBooking();

    if(booking) {
      setCurrentRoom(booking.Room);
      setBookParams({
        id: booking.id,
        roomId: booking.Room.id,
      });
    }
  }, []);
  
  useEffect(async() => {
    const hotel = await getHotelData(hotelId);
    setRooms(hotel.Rooms.sort((a, b) => Number(a.name) - Number(b.name)));
  }, [hotelId]);

  async function handleClick() {
    try {
      if(bookParams.id) {
        await saveBooking({
          bookingId: bookParams.id,
          roomId: bookParams.roomId,
        });
      } else {
        await saveBooking({
          roomId: bookParams.roomId
        });
      }
      toast('Informações salvas com sucesso!');
      setStep(steps.summary);
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  }
  
  return (
    <>
      <Subtitle variant='h6'>Ótima pedida! Agora escolha seu quarto</Subtitle>
      <RoomsWrapper>
        {rooms.map((room, index) => (
          <RoomBox 
            key={index} 
            info={room} 
            bookParams={bookParams} 
            setBookParams={setBookParams}
            wasSelected={wasSelected}
            setWasSelected={setWasSelected}
            currentRoom={currentRoom}
          />
        ))}
      </RoomsWrapper>
    
      {bookParams.roomId && (
        <ConfirmationButton type="submit" disabled={ saveBookingLoading } onClick={handleClick}>
          <ButtonTypography variant="body2">RESERVAR INGRESSO</ButtonTypography>
        </ConfirmationButton>
      )}
    </>
  );
}

function RoomBox({ 
  info, 
  bookParams, 
  setBookParams,
  wasSelected,
  setWasSelected,
  currentRoom
}) {
  const { getRoomOccupancy } = useRoomOccupancy();
  const [vacancies, setVacancies]= useState([]);
  const [status, setStatus] = useState(roomStatus.available);
  const [roomOccupancy, setRoomOccupancy] = useState(null);
  
  useEffect(async() => {
    let response = await getRoomOccupancy(info.id);
    
    if(currentRoom.id === info.id) {
      response.occupancy -= 1;
    }

    const vacanciesInfo = getVacancies(info, response);

    setRoomOccupancy(response);

    setVacancies(vacanciesInfo);
  }, [info]);

  useEffect(() => {
    if(bookParams.roomId === info.id) {
      setStatus(roomStatus.selected);
    } else if(roomOccupancy?.occupancy !== info.capacity) {
      setStatus(roomStatus.primary);  
    }
  }, [bookParams]);

  useEffect(() => {
    if(roomOccupancy?.occupancy === info.capacity) {
      setStatus(roomStatus.full);
    }
  }, [vacancies]);

  function handleSelection() { 
    if(roomOccupancy?.occupancy !== info.capacity && bookParams.roomId !== info.id) {
      setBookParams({ ...bookParams, roomId: info.id });
    } else {
      return;
    }
  }
  
  return (
    <RoomBoxStyle status={status} onClick={handleSelection}>
      <NumberTypography variant ='h6'>{info.name}</NumberTypography>
      
      <span>
        {vacancies.map((vacancy, index) => (
          <Vacancy 
            key={index} 
            info={vacancy}
            status={status} 
            bookParams={bookParams} 
            vacancies={vacancies}
            wasSelected={wasSelected}
            setWasSelected={setWasSelected}
          />
        ))}
      </span>
    </RoomBoxStyle>
  );
}

function Vacancy({ 
  info, 
  status, 
  bookParams,
  vacancies,
  wasSelected,
  setWasSelected 
}) {
  const [color, setColor] = useState(vacancyStatus.primary);
  
  useEffect(() => {
    if(status === roomStatus.full) {
      setColor(vacancyStatus.full);
    }
  }, [status]);

  useEffect(() => {
    if(bookParams.roomId === info.roomId) {
      const selectedAndOccupiedVacancies = findSelectedAndOccupiedVacancies(vacancies, info.roomId);   

      setWasSelected([...wasSelected, selectedAndOccupiedVacancies[0]]);
      
      if(selectedAndOccupiedVacancies.find(item => item.id === info.id)) {
        if(!info.occupied) {
          setColor(vacancyStatus.selected);
        }
        
        info.occupied = true;
      }
    } else if(wasSelected.find(item => item.roomId === info.roomId && item.id ===info.id)) {
      info.occupied = false;

      setColor(vacancyStatus.primary);
    }
  }, [bookParams]);

  return (
    info.occupied 
      ? <VacancyStyle color={color}><IoPerson /></VacancyStyle>
      : <VacancyStyle color={color}><IoPersonOutline /></VacancyStyle> 
  );
}

const RoomsWrapper = styled.div`
    width: 100%;
    display: fex;
    justify-content: left;
    flex-wrap: wrap;
    margin-bottom: 46px;
`;

const RoomBoxStyle = styled.div`
    width: 190px;
    height: 45px;
    border: 1px solid #CECECE;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 12px 11px 16px;
    margin: 8px 17px 0 0;
    background-color: ${props => props.status};
    cursor: pointer;

    svg {
        font-size: 20px!important;
        margin-left: 2px;
    }
`;

const NumberTypography = styled(Typography)`
    color: #454545;
    font-weight: 700!important;
`;

const VacancyStyle = styled.span`
    svg {
        font-size: 20px!important;
        margin-left: 2px;
        color: ${props => props.color};
    }
`;

const ButtonTypography = styled(Typography)`
    text-align: center!important;
    line-height: 1!important;
    font-size: 12px!important;
`;
