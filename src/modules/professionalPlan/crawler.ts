import db, { PROFESSIONAL_PLAN } from '~/lib/db'
import { lookup } from 'fp-ts/lib/Array'
import { fold, map, flatten } from 'fp-ts/lib/Option'
import { flow } from 'fp-ts/lib/function'
import { CRAWLER_ERROR } from '~/common/error'
import { fromURL, querySelectorAll, querySelector, trimInnerHTML } from '~/lib/crawler'
import { replace } from '~/common/string'

const SITE_URL = 'https://www.smartmei.com.br'

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

  const transferTitleDiv = flatten(
    getTransferTitleDiv(transferRow)
  )

  const transferPrice = getTransferPrice(transferPriceDiv)
  const transferDescription = getTransferTitle(transferTitleDiv)

  return db.set(PROFESSIONAL_PLAN, JSON.stringify({
    transferPrice,
    transferDescription,
    queryDate: new Date(),
  }))
}

export default run
