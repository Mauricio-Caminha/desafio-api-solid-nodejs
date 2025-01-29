import { OrgsRepository } from "@/@types/orgs-repository";
import {
  FetchNearbyOrgsUseCaseResponse,
  FetchNearbyOrgsUseCaseRequest,
} from "@/@types/orgs-use-case";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

export class FetchNearbyOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      orgs,
    };
  }
}
