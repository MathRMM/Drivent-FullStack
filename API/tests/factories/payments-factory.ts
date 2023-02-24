import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createPayment(ticketId: number, value: number) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer: faker.name.findName(),
      cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    },
  });
}

export function generateCreditCardData(isValid?: boolean) {
  const futureDate = faker.date.future();

  if(isValid) {
    return {
      issuer: "Mastercard",
      number: "5313 6704 2308 6009",
      name: faker.name.findName(),
      expirationDate: `${futureDate.getMonth() + 1}/${futureDate.getFullYear()}`,
      cvv: "100",
    };
  }

  return {
    issuer: faker.name.findName(),
    number: faker.datatype.number({ min: 100000000000000, max: 999999999999999 }).toString(),
    name: faker.name.findName(),
    expirationDate: `${futureDate.getMonth() + 1}/${futureDate.getFullYear()}`,
    cvv: faker.datatype.number({ min: 100, max: 999 }).toString(),
  };
}
