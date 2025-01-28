import { PetsRepository } from "@/@types/pets-repository";
import {
  SearchPetUseCaseRequest,
  SearchPetUseCaseResponse,
} from "@/@types/pets-use-case";

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return { pets };
  }
}
