import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useRooms(hotelId) {
  const token = useToken();
  
  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: gethotelsDataWithRooms
  } = useAsync(() => hotelsApi.getHotelInformations(hotelId, token));

  return {
    rooms,
    roomsLoading,
    roomsError,
    gethotelsDataWithRooms
  };
}
