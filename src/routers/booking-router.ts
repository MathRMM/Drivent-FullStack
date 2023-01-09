import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, getRoomOccupancy, listAllBookingsWithHotelId } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .get("/bookings", listAllBookingsWithHotelId)
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:roomId", getRoomOccupancy)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
