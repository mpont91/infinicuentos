export class ChoicesError extends Error {
  constructor() {
    super(
      'La IA no ha generado correctamente la historia, puedes volver a intentarlo...',
    )
    this.name = 'ChoicesError'
  }
}
