import { lookup } from 'fp-ts/lib/Array'
import { fold, map, flatten } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { CRAWLER_ERROR, CONVERT_CURRENCY_ERROR } from '~/common/error'
import { fromURL, querySelectorAll, querySelector } from '~/common/crawler'
import { convertBRLValue } from '~/common/currency'
import { replace, trim } from '~/common/string'
import { ProfessionalPlan, TransferPrice } from './types'
import { ProfessionalPlanFilter } from './typeDefs'

const getTransferRow = querySelectorAll('#tarifas-2 > .row')

const getTransferPriceDiv = map(
  querySelector('.tarifas-2-2-2')
)

const getTransferPrice = fold(
  () => 0.0,
  (div: Element) => pipe(
    div.innerHTML,
    trim,
    replace('R$ ', ''),
    replace(',', '.'),
    parseFloat
  )
)

export const find = async (filters: ProfessionalPlanFilter): Promise<ProfessionalPlan> => {
  const { document } = await fromURL(filters.siteUrl).catch(_ => {
    throw CRAWLER_ERROR
  })

  const transferRow = lookup(2, Array.from(
    getTransferRow(document)
  ))

  const transferPriceDiv = flatten(
    getTransferPriceDiv(transferRow)
  )

  const transferPrice = getTransferPrice(transferPriceDiv)

  return {
    queryDate: new Date(),
    transferDescription: filters.siteUrl,
    transferPrice
  }
}

export const convertTransferPrice = async (price: number): Promise<TransferPrice> => (
  await convertBRLValue(price).catch(_ => {
    throw CONVERT_CURRENCY_ERROR
  })
)
