import { CheckInsRepositoryProps } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
} // what you need to send to check-in.

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
} // what you expect to get from the request

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepositoryProps) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
