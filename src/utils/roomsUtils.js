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

export {
  roomStatus,
  vacancyStatus,
  findSelectedAndOccupiedVacancies,
};
