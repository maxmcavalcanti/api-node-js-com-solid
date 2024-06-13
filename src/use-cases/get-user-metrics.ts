import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface GetUserMetricsUseCaseRequest {
  userId: string
}
interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}
export class GetUserMetricsUseCase {
  constructor(
    private checkInsRepository: CheckInsRespository,
  ) { }

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }

}