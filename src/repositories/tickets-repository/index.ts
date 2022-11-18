import { prisma } from "@/config";

function getTypesTickets() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  getTypesTickets
};

export default ticketRepository;
