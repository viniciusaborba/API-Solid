import { FastifyReply } from 'fastify'
import { FastifyRequest } from 'fastify/types/request'

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized.' })
  }
}
