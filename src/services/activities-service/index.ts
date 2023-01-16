import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentsService from "../enrollments-service";

async function postActivitySubscription(userId: number, activityId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const activity = await activitiesRepository.createActivity(enrollment.id, activityId);
  if (!activity) throw notFoundError();

  return activity;
}

const activitiesService = {
  postActivitySubscription
};

export default activitiesService;
