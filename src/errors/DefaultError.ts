export class DefaultError extends Error {
  constructor() {
    super('Oops! Algo ha ido mal, puedes volver a intentarlo...')
    this.name = 'DefaultError'
  }
}
