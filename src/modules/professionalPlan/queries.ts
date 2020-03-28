// import { lookup } from 'fp-ts/lib/Array'
import { fold } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { fromURL, querySelectorAll, querySelector } from '~/common/crawler'
import { convertBRLValue } from '~/common/currency'
import { replace, trim } from '~/common/string'
import { ProfessionalPlan, TransferPrice } from './types'
import { ProfessionalPlanFilter } from './typeDefs'

const getTransferPriceDiv = querySelector('.tarifas-2-2-2')

const getTransferRow = querySelectorAll('#tarifas-2 > .row')

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
  const { document } = await fromURL(filters.siteUrl)
  // const transfer = lookup(2, Array.from(
  //   getTransferRow(document)
  // ))
  const transfer = getTransferRow(document)[2]
  const transferPriceDiv = getTransferPriceDiv(transfer)
  const transferPrice = getTransferPrice(transferPriceDiv)

  return {
    queryDate: new Date(),
    transferDescription: filters.siteUrl,
    transferPrice
  }
}

export const convertTransferPrice = async (price: number): Promise<TransferPrice> => {
  try {
    return await convertBRLValue(price)
  } catch (error) {
    throw new Error('Desculpe, houve um erro inesperado ao converter o valor de transferencia')
  }
}
