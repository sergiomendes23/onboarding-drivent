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

const paymentsService = {
  getPaymentsService
};

export default paymentsService;
