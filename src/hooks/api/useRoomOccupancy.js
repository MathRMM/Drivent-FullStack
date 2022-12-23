import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useRoomOccupancy() {
  const token = useToken();
  
  const {
    data: roomOccupancy,
    loading: roomOccupancyLoading,
    error: roomOccupancyError,
    act: getRoomOccupancy
  } = useAsync((data) => bookingApi.getRoomOccupancy(data, token), false);
  
  return {
    roomOccupancy,
    roomOccupancyLoading,
    roomOccupancyError,
    getRoomOccupancy
  };
}
