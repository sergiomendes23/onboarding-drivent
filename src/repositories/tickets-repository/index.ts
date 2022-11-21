import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

function getTypesTickets() {
  return prisma.ticketType.findMany();
}

function getTicketsInfo(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    }       
  });
}

async function getTicketId(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    }
  });
}

function postTickets(newTicket: Omit<Ticket, "id" | "createdAt">) {
  return prisma.ticket.create({
    data: newTicket,
    include: {
      TicketType: true,
    }
  });
}

function statusTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    }
  });
}

const ticketRepository = {
  getTypesTickets,
  getTicketsInfo,
  postTickets,
  getTicketId,
  statusTicket
};

export default ticketRepository;
