import request from '~/lib/request'

const CURRENCY_API = 'https://api.exchangeratesapi.io/latest'

type CurrencyAPIResponse = {
  rates: {
    EUR: number
    USD: number
  }
}

const BRLToCurrency = (value: number) => (currency: number) => (
  Number.parseFloat((value * currency).toFixed(2))
)

export const convertBRLValue = async (value: number) => {
  const { data } = await request.get<CurrencyAPIResponse>(CURRENCY_API, {
    params: {
      base: 'BRL',
      symbols: 'EUR,USD'
    }
  })

  const { EUR, USD } = data.rates
  const toCurrency = BRLToCurrency(value)

  return {
    BRL: value,
    EUR: toCurrency(EUR),
    USD: toCurrency(USD)
  }
}
