import request from '~/lib/request'
import loadData from './loadData'

const CURRENCY_API = 'https://api.exchangeratesapi.io/latest'

type CurrencyAPIResponse = {
  rates: {
    EUR: number
    USD: number
  }
}

const get = async (base: string) => {
  const { data } = await request.get<CurrencyAPIResponse>(CURRENCY_API, {
    params: { base }
  })

  return data
}

const cachedGet = loadData(get)

const BRLToCurrency = (value: number) => (currency: number) => (
  Number.parseFloat((value * currency).toFixed(2))
)

export const convertBRLValue = async (value: number) => {
  const data = await cachedGet.load('BRL')

  const { EUR, USD } = data.rates
  const toCurrency = BRLToCurrency(value)

  return {
    BRL: value,
    EUR: toCurrency(EUR),
    USD: toCurrency(USD)
  }
}
