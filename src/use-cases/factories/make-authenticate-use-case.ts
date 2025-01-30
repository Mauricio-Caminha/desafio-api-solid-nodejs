import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "@/use-cases/authenticate-org";

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateOrgUseCase(orgsRepository);

  return authenticateUseCase;
}
