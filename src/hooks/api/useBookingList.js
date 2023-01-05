import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBookingList() {
  const token = useToken();
  
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking
  } = useAsync(() => bookingApi.getAllBooking(token));
  
  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking
  };
}
