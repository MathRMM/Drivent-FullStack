import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentByTicketId, paymentProcess } from "@/controllers";
import { paymentsBodySchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", paymentProcess);

export { paymentsRouter };

//, validateBody(paymentsBodySchema)
