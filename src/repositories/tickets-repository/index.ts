import { prisma } from "@/config";

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

const ticketRepository = {
  getTypesTickets,
  getTicketsInfo
};

export default ticketRepository;
