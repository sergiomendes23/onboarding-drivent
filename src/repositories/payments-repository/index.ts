import { prisma } from "@/config";

function getPaymentsList(ticketId: number) {
  const paymentList = prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
  return paymentList;
}

const paymentsRepository = {
  getPaymentsList
};

export default paymentsRepository;
