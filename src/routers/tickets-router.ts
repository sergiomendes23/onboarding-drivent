import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTypes, getTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTypes)
  .get("/", getTicket)
  .post("/");

export { ticketsRouter };
