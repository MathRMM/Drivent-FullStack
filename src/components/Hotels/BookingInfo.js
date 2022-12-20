import { useEffect } from 'react';
import { useState } from 'react';
import useBooking from '../../hooks/api/useBooking';
import useHotel from '../../hooks/api/useHotel';

export default function BookingInfo() {
  const [bookingInfo, setBookingInfo] = useState(null);
  const booking = useBooking().booking;
  useEffect(() => {
    if(booking) {
      setBookingInfo(booking);  

      if(booking.Room.capacity === 1) {
        setBookingInfo({ ...booking, capacity: 'Single' });
      } else if(booking.Room.capacity === 2) {
        setBookingInfo({ ...booking, capacity: 'Double' });
      } else {
        setBookingInfo({ ...booking, capacity: 'Triple' }); ;
      }
    }
  }, [booking]);

  return (
    <>
      <h1>{bookingInfo?.Room.Hotel?.name}</h1>
      <p>{`${bookingInfo?.Room?.name} (${bookingInfo?.capacity})`}</p>
    </>
  );
}
