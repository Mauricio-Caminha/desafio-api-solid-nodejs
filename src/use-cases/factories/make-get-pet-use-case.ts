import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsUseCase } from "../get-pet-details";

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetUseCase;
}
