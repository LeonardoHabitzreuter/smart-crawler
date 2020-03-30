import db, { PROFESSIONAL_PLAN } from '~/lib/db'
import { lookup } from 'fp-ts/lib/Array'
import { fold, map, flatten } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { CRAWLER_ERROR } from '~/common/error'
import { fromURL, querySelectorAll, querySelector } from '~/lib/crawler'
import { replace, trim } from '~/common/string'

const SITE_URL = 'https://www.smartmei.com.br'

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

const run = async () => {
  const { document } = await fromURL(SITE_URL).catch(_ => {
    throw CRAWLER_ERROR
  })

  const transferRow = lookup(2, Array.from(
    getTransferRow(document)
  ))

  const transferPriceDiv = flatten(
    getTransferPriceDiv(transferRow)
  )

  const transferPrice = getTransferPrice(transferPriceDiv)

  return db.set(PROFESSIONAL_PLAN, JSON.stringify({
    queryDate: new Date(),
    transferDescription: SITE_URL,
    transferPrice
  }))
}

export default run
