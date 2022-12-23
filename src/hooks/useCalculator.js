export function calculatePrices(ticketsTypes) {
  const online = ticketsTypes?.find((type) => type.isRemote);
  const presential = ticketsTypes?.find((type) => !type.isRemote && !type.includesHotel);
  const presentialHotel = ticketsTypes?.find((type) => !type.isRemote && type.includesHotel);

  return {
    online: online?.price,
    presential: presential?.price,
    hotel: presentialHotel?.price - presential?.price,
    noHotel: 0,
  };
}

export function calculateTotalPrice({ ticketInfo, modality, prices }) {
  let price = 0;

  if (ticketInfo.modality === modality.online) {
    price += prices.online;
  } else {
    price += prices.presential;
  }

  if (ticketInfo.accommodation === 'Com Hotel') {
    price += prices.hotel;
  }

  return price;
}
