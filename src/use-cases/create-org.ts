import { hash } from "bcryptjs";

import { OrgsRepository } from "@/@types/orgs-repository";
import {
  CreateOrgUseCaseResponse,
  CreateOrgUseCaseRequest,
} from "@/@types/orgs-use-case";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    });

    return { org };
  }
}
