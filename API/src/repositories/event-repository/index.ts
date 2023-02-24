import { prisma } from "@/config";

async function findFirst() {
  return prisma.event.findFirst({
    include: {
      Activities: {
        include: {
          Participants: true
        }
      },
      Places: {
        include: {
          Activities: {
            include: {
              Participants: true
            }
          }
        }
      }
    },
  });
}

const eventRepository = {
  findFirst
};

export default eventRepository;
