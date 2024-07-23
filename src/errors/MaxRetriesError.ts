export class MaxRetriesError extends Error {
  constructor() {
    super(
      'Se ha alcanzado el límite de peticiones por minuto. Espera unos segundos antes de volver a intentarlo...',
    )
    this.name = 'MaxRetriesError'
  }
}
