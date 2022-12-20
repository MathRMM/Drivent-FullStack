import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, getRoomOccupancy } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:roomId", getRoomOccupancy)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
