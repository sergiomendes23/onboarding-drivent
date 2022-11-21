import { prisma } from "@/config";
import { Payment } from "@prisma/client";

function getPaymentsList(ticketId: number) {
  const paymentList = prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
  return paymentList;
}

function postPaymentsCreate(paymentData: Omit<Payment, "id" | "createdAt">) {
  return prisma.payment.create({
    data: paymentData,
  });
}

const paymentsRepository = {
  getPaymentsList,
  postPaymentsCreate
};

export default paymentsRepository;
