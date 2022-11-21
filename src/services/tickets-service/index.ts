import { invalidDataError, notFoundError } from "@/errors";
import { TicketType } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository/index";
import { Ticket } from "@prisma/client";

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

async function postTickets(userId: number, ticketTypeId: number) {
  if(!ticketTypeId) {
    throw invalidDataError;
  }

  const infoTickets = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!infoTickets) {
    throw notFoundError();
  }

  const newTicket: Omit<Ticket, "id" | "createdAt"> = {
    status: "RESERVED",
    ticketTypeId: ticketTypeId,
    enrollmentId: infoTickets.id,
    updatedAt: new Date()
  };

  const ticketsData = await ticketRepository.postTickets(newTicket);
  return ticketsData;
}

const ticketSevice = {
  ticketTypes,
  getTickets,
  postTickets
};

export default ticketSevice;
