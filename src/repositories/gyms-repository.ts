import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearByParams {
  latitude: number
  longitude: number
}

export interface GymsRepositoryProps {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: FindManyNearByParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
