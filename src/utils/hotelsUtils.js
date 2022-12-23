const steps = {
  paymentRequired: 1,
  validateBooking: 2,
  hotels: 3,
  summary: 4,
};

const ticketStatus = {
  reserved: 'RESERVED',
  paid: 'PAID'
};

const ticketType = {
  noHotel: 1,
  online: 3,
};

const cardStatus = {
  unselected: '#F1F1F1',
  selected: '#FFEED2',
};

export {
  steps,
  ticketStatus, 
  ticketType,
  cardStatus,
};
