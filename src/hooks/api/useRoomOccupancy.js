import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useRoomOccupancy(roomId) {
  const token = useToken();
  
  const {
    data: roomOccupancy,
    loading: roomOccupancyLoading,
    error: roomOccupancyError,
    act: getRoomOccupancy
  } = useAsync(() => bookingApi.getRoomOccupancy(roomId, token));
  
  return {
    roomOccupancy,
    roomOccupancyLoading,
    roomOccupancyError,
    getRoomOccupancy
  };
}
