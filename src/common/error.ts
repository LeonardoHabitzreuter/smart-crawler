class CustomError extends Error {
  constructor(code: string, message: string) {
    super(message)
    this.code = code
  }

  public code: string
}

export const CRAWLER_ERROR = new CustomError(
  'CRAWLER_ERROR',
  'Desculpe, não foi possível obter as informações deste site'
)

export const CONVERT_CURRENCY_ERROR = new CustomError(
  'CONVERT_CURRENCY_ERROR',
  'Desculpe, houve um erro inesperado ao converter o valor de transferencia'
)
