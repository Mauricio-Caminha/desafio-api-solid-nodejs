import { PetsRepository } from "@/@types/pets-repository";
import {
  GetPetDetailsUseCaseRequest,
  GetPetDetailsUseCaseResponse,
} from "@/@types/pets-use-case";
import { PetNotFoundError } from "./errors/pet-not-found-error";

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new PetNotFoundError();
    }

    return { pet };
  }
}
