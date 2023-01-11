import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";
import { Address } from "@prisma/client";

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function findById(enrollmentId: number) {
  return prisma.enrollment.findFirst({
    where: { id: enrollmentId }
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
  createdAddress: CreateAddressParams,
  updatedAddress: UpdateAddressParams,
) {
  await prisma.$transaction(async (tx) => {
    const newEnrollment = await prisma.enrollment.upsert({
      where: {
        userId,
      },
      create: createdEnrollment,
      update: updatedEnrollment,
    });

    await prisma.address.upsert({
      where: {
        enrollmentId: newEnrollment.id,
      },
      create: {
        ...createdAddress,
        Enrollment: { connect: { id: newEnrollment.id } },
      },
      update: updatedAddress,
    });
  });
}

export type CreateAddressParams = Omit<Address, "id" | "createdAt" | "updatedAt" | "enrollmentId">;
export type UpdateAddressParams = CreateAddressParams;
export type CreateEnrollmentParams = Omit<Enrollment, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId">;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findById,
};

export default enrollmentRepository;
