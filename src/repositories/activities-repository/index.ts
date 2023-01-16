import { prisma } from "@/config";

async function createActivity(enrollmentId: number, activityId: number) {
  return prisma.participants.create({
    data: {
      enrollmentId: enrollmentId,
      activitiesId: activityId
    }
  });
}

const activitiesRepository = {
  createActivity
};

export default activitiesRepository;
