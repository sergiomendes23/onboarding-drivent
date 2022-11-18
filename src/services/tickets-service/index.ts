import { TicketType } from "@/protocols";
import ticketRepository from "@/repositories/tickets-repository/index";

async function ticketTypes(): Promise<TicketType[]> {
  const ticket = await ticketRepository.getTypesTickets();
  return ticket;
}

const ticketSevice = {
  ticketTypes
};

export default ticketSevice;
