import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayments, postPayments } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", postPayments);

export { paymentsRouter };
