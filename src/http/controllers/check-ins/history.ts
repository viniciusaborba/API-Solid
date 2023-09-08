import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-member-check-ins-history-use-case'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const fetchUserCheckInsHistoryUseCase = MakeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return res.status(200).send({
    checkIns,
  })
}
