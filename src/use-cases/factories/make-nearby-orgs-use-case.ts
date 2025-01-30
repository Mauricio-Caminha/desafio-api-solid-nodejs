import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchNearbyOrgsUseCase } from "@/use-cases/fetch-nearby-orgs";

export function makeNearbyOrgsUseCases() {
  const orgsRepository = new PrismaOrgsRepository();
  const fetchNearbyOrgsUseCase = new FetchNearbyOrgsUseCase(orgsRepository);

  return fetchNearbyOrgsUseCase;
}
