const roomStatus = {
  available: 'transparent',
  full: '#E9E9E9',
  selected: '#FFEED2',
};

const vacancyStatus = {
  primary: '#000000',
  full: '#8C8C8C',
  selected: '#FF4791',
};

function findSelectedAndOccupiedVacancies(vacancies, roomId) {
  let available = vacancies.filter(vacancy => vacancy.roomId === roomId && !vacancy.occupied);
  let occupied = vacancies.filter(vacancy => vacancy.roomId === roomId && vacancy.occupied);
  available.sort((a, b) => a.roomId - b.roomId);
  let answer = occupied;
  answer.push(available[available.length - 1]);
  return answer;
}

function getVacancies(room, roomOccupancy) {
  let vacancies = [];  
    
  for(let i = 0; i < room.capacity - roomOccupancy.occupancy; i ++) {
    vacancies.push({ id: i, roomId: room.id, number: Number(room.name), occupied: false });
  }
  
  for(let i = room.capacity - roomOccupancy.occupancy; i < room.capacity; i++) {
    vacancies.push({ id: i, roomId: room.id, number: Number(room.name), occupied: true });
  }

  return vacancies;
}

const capacityText = {
  1: 'Single',
  2: 'Double',
  3: 'Triple', 
};

export {
  capacityText, 
  roomStatus,
  vacancyStatus,
  findSelectedAndOccupiedVacancies,
  getVacancies,
};
