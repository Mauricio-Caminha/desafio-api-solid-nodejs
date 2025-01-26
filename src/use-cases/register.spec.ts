import { expect, it, describe, beforeEach } from "vitest";
import { compare } from "bcryptjs";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { RegisterUseCase } from "@/use-cases/register";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let registerUseCase: RegisterUseCase;

describe("Register Orgs Use Case", () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    registerUseCase = new RegisterUseCase(inMemoryOrgsRepository);
  });

  it("should be able to register", async () => {
    const { org } = await registerUseCase.execute({
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "88888888",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash the password upon registration", async () => {
    const { org } = await registerUseCase.execute({
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "88888888",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    });

    const isPasswordCorrectlyHashed = await compare("123456", org.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with the same email twice", async () => {
    const email = "johndoe@example.com";

    await registerUseCase.execute({
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "88888888",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    });

    await expect(() =>
      registerUseCase.execute({
        name: "Pets Orgs",
        author_name: "Mauri",
        email: "org@email.com",
        whatsapp: "123456789",
        password: "123456",
        cep: "88888888",
        city: "City",
        state: "State",
        neighborhood: "Neighborhood",
        street: "Street",
        latitude: 0,
        longitude: 0,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
