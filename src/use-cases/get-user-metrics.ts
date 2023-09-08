import { CheckInsRepositoryProps } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface GetUserMetricsUseCaseRequest {
  userId: string
} // what you need to send to check-in.

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
} // what you expect to get from the request

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepositoryProps) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
