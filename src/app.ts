import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((err, _req, res) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error',
      issues: err.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // TODO: Here we should log to an external tool like DataDog, etc...
  }

  return res.status(500).send({
    message: 'Internal server error',
  })
})
