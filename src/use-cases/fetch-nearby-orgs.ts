import { OrgsRepository } from "@/@types/orgs-repository";
import {
  FetchNearbyOrgsUseCaseResponse,
  FetchNearbyOrgsUseCaseRequest,
} from "@/@types/orgs-use-case";

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

    const orgsWithoutPassword = orgs.map(({ password, ...rest }) => rest);

    return {
      orgs: orgsWithoutPassword,
    };
  }
}
