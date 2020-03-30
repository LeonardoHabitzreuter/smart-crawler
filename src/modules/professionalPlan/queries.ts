import { fold, map, flatten } from 'fp-ts/lib/Option'
import { lookup } from 'fp-ts/lib/Array'
import { flow } from 'fp-ts/lib/function'
import { fromURL, querySelectorAll, querySelector, trimInnerHTML } from '~/lib/crawler'
import { CRAWLER_ERROR, CONVERT_CURRENCY_ERROR } from '~/common/error'
import { convertBRLValue } from '~/common/currency'
import { replace, trim } from '~/common/string'
import { ProfessionalPlan, TransferPrice } from './types'
import { ProfessionalPlanFilter } from './typeDefs'

const getTransferRow = querySelectorAll('#tarifas-2 > .row')

const getTransferPriceDiv = map(
  querySelector('.tarifas-2-2-2')
)

const getTransferTitleDiv = map(
  querySelector('.cell-small-title')
)

const getTransferTitle = fold(
  () => '',
  trimInnerHTML
)

const getTransferPrice = fold(
  () => 0.0,
  flow(
    trimInnerHTML,
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

  const transferTitleDiv = flatten(
    getTransferTitleDiv(transferRow)
  )

  const transferPrice = getTransferPrice(transferPriceDiv)
  const transferDescription = getTransferTitle(transferTitleDiv)

  return {
    transferPrice,
    transferDescription,
    queryDate: new Date()
  }
}

export const convertTransferPrice = async (price: number): Promise<TransferPrice> => (
  await convertBRLValue(price).catch(_ => {
    throw CONVERT_CURRENCY_ERROR
  })
)
