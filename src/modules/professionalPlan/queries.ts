import db, { PROFESSIONAL_PLAN } from '~/lib/db'
import { fold, fromNullable } from 'fp-ts/lib/Option'
import { CONVERT_CURRENCY_ERROR } from '~/common/error'
import { convertBRLValue } from '~/common/currency'
import { ProfessionalPlan, TransferPrice } from './types'

const defResponse = {
  queryDate: new Date(),
  transferDescription: '',
  transferPrice: 0.0
}

const handleResult = fold(
  () => defResponse,
  (result: string) => {
    const obj = JSON.parse(result)
    return {
      queryDate: new Date(obj.queryDate),
      transferDescription: obj.transferDescription,
      transferPrice: obj.transferPrice
    }
  }
)

export const find = async (): Promise<ProfessionalPlan> => {
  const result = await db.get(PROFESSIONAL_PLAN).catch((error: Error) => {
    throw error
  })

  return handleResult(fromNullable(
    result
  ))
}

export const convertTransferPrice = async (price: number): Promise<TransferPrice> => (
  await convertBRLValue(price).catch(_ => {
    throw CONVERT_CURRENCY_ERROR
  })
)
