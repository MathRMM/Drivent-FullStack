import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useHotel(hotelId) {
  const token = useToken();
  
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotelData
  } = useAsync(() => hotelsApi.getHotelInformations(hotelId, token));

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotelData
  };
} 
