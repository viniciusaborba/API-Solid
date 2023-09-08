import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UsersRepositoryProps } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
} // what you need to send to auth.

interface GetUserProfileUseCaseResponse {
  user: User
} // what you expect to get from the request

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepositoryProps) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
