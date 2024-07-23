export class TimeoutError extends Error {
  constructor() {
    super(
      'Se ha alcanzado el límite de tiempo esperando la respuesta, puedes volver a intentarlo...',
    )
    this.name = 'TimeoutError'
  }
}
