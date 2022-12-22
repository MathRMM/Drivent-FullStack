import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useSaveBooking() {
  const token = useToken();

  const {
    loading: saveBookingLoading,
    error: saveBookingError,
    act: saveBooking
  } = useAsync((data) => {
    if(data?.bookingId) {
      return bookingApi.changeBooking(data, token), false;
    } 

    return bookingApi.postBooking(data, token), false;
  });

  return {
    saveBookingLoading,
    saveBookingError,
    saveBooking
  };
}
