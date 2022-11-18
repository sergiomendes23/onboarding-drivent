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
