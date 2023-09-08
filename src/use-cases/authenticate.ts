import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { UsersRepositoryProps } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
} // what you need to send to auth.

interface AuthenticateUseCaseResponse {
  user: User
} // what you expect to get from the request

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepositoryProps) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
