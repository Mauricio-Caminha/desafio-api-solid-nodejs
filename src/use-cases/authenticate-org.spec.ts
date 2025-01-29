import { expect, it, describe, beforeEach } from "vitest";
import { hash } from "bcryptjs";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateOrgUseCase } from "./authenticate-org";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let authenticateUseCase: AuthenticateOrgUseCase;

describe("Authenticate ORG Use Case", () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    authenticateUseCase = new AuthenticateOrgUseCase(inMemoryOrgsRepository);

    await inMemoryOrgsRepository.create({
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
      whatsapp: "123456789",
      password: await hash("123456", 6),
      cep: "88888888",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    });
  });

  it("should be able to authenticate an ORG", async () => {
    const { org } = await authenticateUseCase.execute({
      email: "org@email.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await expect(async () =>
      authenticateUseCase.execute({
        email: "org@email.com",
        password: await hash("1234567", 6),
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
