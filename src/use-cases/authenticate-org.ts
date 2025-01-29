import { compare } from "bcryptjs";

import { OrgsRepository } from "@/@types/orgs-repository";
import {
  AuthenticateOrgUseCaseRequest,
  AuthenticateOrgUseCaseResponse,
} from "@/@types/authenticate-use-case";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, org.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
