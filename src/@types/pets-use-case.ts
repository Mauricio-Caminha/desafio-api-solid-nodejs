import { Pet } from "@prisma/client";

export interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  energy_level: string;
  environment: string;
  org_id: string;
}

export interface CreatePetUseCaseResponse {
  pet: Pet;
}

export interface SearchPetUseCaseRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

export interface SearchPetUseCaseResponse {
  pets: Pet[];
}

export interface GetPetDetailsUseCaseRequest {
  pet_id: string;
}

export interface GetPetDetailsUseCaseResponse {
  pet: Pet;
}
