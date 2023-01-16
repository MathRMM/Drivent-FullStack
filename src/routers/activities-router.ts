import { activityProcess } from "@/controllers";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter.post("/:activityId", activityProcess);

export { activitiesRouter };
