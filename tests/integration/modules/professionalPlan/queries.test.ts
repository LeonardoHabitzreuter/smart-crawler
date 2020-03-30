import 'reflect-metadata'
import 'dotenv/config'
import { JSDOM } from 'jsdom'
import { flow } from 'fp-ts/lib/function'
import { startSchedule, stopSchedule, closeDBConnection } from '../../../helpers/hooks'
import { mockServer } from '../../../helpers/mocks'
import { shouldBe } from '../../../helpers/assert'

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
    const { query } = mockServer()

    const response = await query({ query: GET_PROFESSIONAL_PLAN })
    
    const { transferDescription, transferPrice, queryDate } = response.data?.professionalPlan

    expect(transferDescription).toBe('https://www.smartmei.com.br')
    expect(transferPrice.BRL).toBeGreaterThan(transferPrice.EUR)
    expect(transferPrice.BRL).toBeGreaterThan(transferPrice.USD)
    shouldBe(new Date(queryDate), new Date())
  })
})
