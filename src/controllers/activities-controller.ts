import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function activityProcess(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.params;

  try {
    if (!activityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const activity = await activitiesService.postActivitySubscription(userId, Number(activityId));
    if (!activity) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(activity);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
