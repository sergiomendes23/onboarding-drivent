import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTypes } from "@/controllers/tickets-controller.js";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTypes)
  .get("/")
  .post("/");

export { ticketsRouter };
