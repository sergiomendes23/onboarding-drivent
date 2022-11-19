import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketSevice from "@/services/tickets-service";

export async function getTypes(req: AuthenticatedRequest, res: Response) {
  try{
    const ticketType = await ticketSevice.ticketTypes();
    return res.status(httpStatus.OK).send(ticketType);
  }catch(error) {
    return res.status(httpStatus.BAD_REQUEST);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try{
    const ticket = await ticketSevice.getTickets(userId);
    return res.status(httpStatus.OK).send(ticket);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
