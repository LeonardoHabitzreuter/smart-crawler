import 'reflect-metadata'
import 'dotenv/config'
import { JSDOM } from 'jsdom'
import { flow } from 'fp-ts/lib/function'
import { startSchedule, stopSchedule, closeDBConnection } from '../../../helpers/hooks'
import { mockServer, mockAxios } from '../../../helpers/mocks'
import { shouldBe } from '../../../helpers/assert'

const { get } = mockAxios()

JSDOM.fromURL = () => JSDOM.fromFile('tests/assets/SmartMEI.html')

const GET_PROFESSIONAL_PLAN = /* GraphQL */ `
  query {
    professionalPlan {
      queryDate
      transferDescription
      transferPrice {
        BRL
        USD
        EUR
      }
    }
  }
`

describe('professionalPlan query', () => {
  beforeAll(startSchedule)
  afterAll(flow(
    closeDBConnection,
    stopSchedule
  ))

  test('should return professional plan data from smartMEI website', async () => {
    const rates = { EUR: 0.178874877, USD: 0.1963509525 }
    get.mockReturnValue(Promise.resolve({ data: { rates } }))
    const { query } = mockServer()

    const response = await query({ query: GET_PROFESSIONAL_PLAN })
    
    const { transferDescription, transferPrice, queryDate } = response.data?.professionalPlan

    expect(transferDescription).toBe('Transferência')
    shouldBe(new Date(queryDate), new Date())
    expect(transferPrice).toMatchObject({
      BRL: 7,
      EUR: 1.25,
      USD: 1.37,
    })
  })
})
