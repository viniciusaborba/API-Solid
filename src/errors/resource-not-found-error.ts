export class ResourceNotFoundError extends Error {
  constructor() {
    super('E-mail already in use!')
  }
}
