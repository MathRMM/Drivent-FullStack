import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
    await prisma.ticketType.createMany({
      data: [
        { name: 'Presencial', includesHotel: false, isRemote: false, price: 250 },
        { name: 'Presencial', includesHotel: true, isRemote: false, price: 700 },
        { name: 'Online', includesHotel: false, isRemote: true, price: 100 },
      ],
    });

    const hotel1 = await prisma.hotel.create({
      data: {
        name: 'Resort',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
      },
    });

    const hotel2 = await prisma.hotel.create({
      data: {
        name: 'Palace',
        image: 'https://cdn.palacepraia.com.br/wp-content/uploads/2022/11/palace-21.webp',
      },
    });

    await prisma.room.createMany({
      data: [
        {
          capacity: 3,
          hotelId: hotel1.id,
          name: '101',
        },
        {
          capacity: 4,
          hotelId: hotel1.id,
          name: '102',
        },
        {
          capacity: 4,
          hotelId: hotel1.id,
          name: '201',
        },
        {
          capacity: 5,
          hotelId: hotel1.id,
          name: '300',
        },
        {
          capacity: 3,
          hotelId: hotel2.id,
          name: '101',
        },
        {
          capacity: 4,
          hotelId: hotel2.id,
          name: '102',
        },
        {
          capacity: 5,
          hotelId: hotel2.id,
          name: '200',
        },
      ],
    });

    const place1 = await prisma.place.create({
      data: {
        name: 'Auditório Principal',
        eventId: event.id,
      },
    });

    const place2 = await prisma.place.create({
      data: {
        name: 'Auditório Lateral',
        eventId: event.id,
      },
    });

    await prisma.activity.createMany({
      data: [
        {
          name: 'Hackaton: Hackeando a nasa',
          placeId: place1.id,
          startsAt: new Date('2024-11-30T18:30:000Z'),
          endsAt: new Date('2024-12-01T12:30:000Z'),
          eventId: event.id,
          Vacancies: 200,
        },
        {
          name: 'Hackaton: Hackeando a Space X',
          placeId: place1.id,
          startsAt: new Date('2024-12-01T18:30:000Z'),
          endsAt: new Date('2024-12-02T12:30:000Z'),
          eventId: event.id,
          Vacancies: 200,
        },
        {
          name: 'Escalando Aplicações usando sistemas de Cluster em Nuvem',
          placeId: place2.id,
          startsAt: new Date('2024-12-01T09:30:000Z'),
          endsAt: new Date('2024-12-01T12:00:000Z'),
          eventId: event.id,
          Vacancies: 50,
        },
        {
          name: 'Se tu chegou até aqui, me da um emprego pls!!',
          placeId: place2.id,
          startsAt: new Date('2024-12-01T13:30:000Z'),
          endsAt: new Date('2024-12-01T15:00:000Z'),
          eventId: event.id,
          Vacancies: 50,
        },
      ],
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
