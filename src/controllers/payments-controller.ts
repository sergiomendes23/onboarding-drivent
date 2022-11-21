import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = req.query.ticketId;
    
  try{
    const payments = await paymentsService.getPaymentsService(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(payments);
  }catch(error) {
    if(error.name === "invalidDataError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if(error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
