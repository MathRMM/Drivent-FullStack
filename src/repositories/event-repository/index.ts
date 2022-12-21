import { prisma } from "@/config";

async function findFirst() {
  return prisma.event.findFirst({
    include: {
      Activities: true,
      Places: true
    }
  });
}

const eventRepository = {
  findFirst
};

export default eventRepository;
