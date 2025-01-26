import { hash } from "bcryptjs";

import { OrgsRepository } from "@/@types/orgs-repository";
import {
  RegisterUseCaseResponse,
  RegisterUseCaseRequest,
} from "@/@types/orgs-use-case";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

export class RegisterUseCase {
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
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
