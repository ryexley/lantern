export class EnvError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, EnvError)
    this.name = "EnvError"
  }
}
