import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "@/use-cases/create-org";

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const createOrgUseCase = new CreateOrgUseCase(orgsRepository);

  return createOrgUseCase;
}
