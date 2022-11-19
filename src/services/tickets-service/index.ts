import { notFoundError } from "@/errors";
import { TicketType } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository/index";

async function ticketTypes(): Promise<TicketType[]> {
  const ticket = await ticketRepository.getTypesTickets();
  return ticket;
}

async function getTickets(userId: number) {
  const infoTickets = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!infoTickets) {
    throw notFoundError();
  }

  const listTicket = await ticketRepository.getTicketsInfo(infoTickets.id);
  if(!listTicket) {
    throw notFoundError();
  }

  return listTicket;
}

const ticketSevice = {
  ticketTypes,
  getTickets
};

export default ticketSevice;
