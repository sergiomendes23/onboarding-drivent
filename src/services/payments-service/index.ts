import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import { BodyCard } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { Payment } from "@prisma/client";

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

  const validTicket = await ticketRepository.getTicketId(paymentsBody.ticketId);

  if (!validTicket) {
    throw notFoundError();
  }

  const validEnrollments = await enrollmentRepository.enrollmentByUserId(userId);

  if (validEnrollments.id !== validTicket.enrollmentId) {
    throw unauthorizedError();
  }

  const ticketUse = await ticketRepository.getTicketsInfo(validEnrollments.id);
  const price = ticketUse.TicketType.price;
  const fourDigits = paymentsBody.cardData.number.toString().slice(-4);
  const paymentsData: Omit<Payment, "id" | "createdAt"> = {
    ticketId: paymentsBody.ticketId,
    value: price,
    cardIssuer: paymentsBody.cardData.issuer,
    cardLastDigits: fourDigits,
    updatedAt: new Date(),
  };

  await ticketRepository.statusTicket(validTicket.id);

  const paymentData = await paymentsRepository.postPaymentsCreate(paymentsData);
  return paymentData;
}

const paymentsService = {
  getPaymentsService,
  paymentsCreate
};

export default paymentsService;
