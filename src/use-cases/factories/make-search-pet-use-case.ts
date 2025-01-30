import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetUseCase } from "../search-pet";

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const searchPetUseCase = new SearchPetUseCase(petsRepository);

  return searchPetUseCase;
}
