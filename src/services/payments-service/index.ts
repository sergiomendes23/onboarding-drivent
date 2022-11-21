import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function getPaymentsService(ticketId: number, userId: number) {
  if(!ticketId) {
    throw invalidDataError;
  }

  const validTicket = await ticketRepository.getTicketId(ticketId);

  if(!validTicket) {
    throw notFoundError();
  }

  const validEnrollments = await enrollmentRepository.enrollmentByUserId(userId);

  if(validEnrollments.id !== validTicket.enrollmentId) {
    throw unauthorizedError();
  }

  const paymentsData = await paymentsRepository.getPaymentsList(ticketId);
    
  return paymentsData;
}

async function paymentsCreate(paymentsBody: BodyCard, userId: number) {
  if (!paymentsBody.ticketId) {
    throw invalidDataError;
  }
  if (!paymentsBody.cardData) {
    throw invalidDataError;
  }
}

type BodyCard = {
    ticketId: number,
    cardData: CardData
}

type CardData = {
    inssuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

const paymentsService = {
  getPaymentsService,
  paymentsCreate
};

export default paymentsService;
