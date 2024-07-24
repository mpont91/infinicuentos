export class InvalidApiKeyError extends Error {
  constructor() {
    super(
      'La API key proporcionada no es válida. Por favor cámbiala y vuelve a intentarlo...',
    )
    this.name = 'InvalidApiKeyError'
  }
}
