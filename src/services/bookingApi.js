import api from './api';

export async function getBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

export async function getRoomOccupancy(roomId, token) {
  const response = await api.get(`/booking/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

export async function postBooking(body, token) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

export async function changeBooking(data, token) {
  const response = await api.put(`/booking/${data?.bookingId}`, { roomId: data?.roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
