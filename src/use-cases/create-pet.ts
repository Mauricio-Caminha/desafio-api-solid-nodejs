import { OrgsRepository } from "@/@types/orgs-repository";
import { PetsRepository } from "@/@types/pets-repository";
import {
  CreatePetUseCaseRequest,
  CreatePetUseCaseResponse,
} from "@/@types/pets-use-case";
import { OrgNotFoundError } from "./errors/org-not-found-error";

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    energy_level,
    environment,
    size,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy_level,
      environment,
      size,
      org_id,
    });

    return { pet };
  }
}
