import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckInsBodySchema.parse(req.body)

  const { gymId } = createCheckInParamsSchema.parse(req.params)

  const checkInUseCase = MakeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(201).send()
}
