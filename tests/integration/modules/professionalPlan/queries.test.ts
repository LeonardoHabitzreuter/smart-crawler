import 'reflect-metadata'
import 'dotenv/config'
import { mockServer } from '../../../helpers/mocks'
import { shouldBe } from '../../../helpers/assert'

const GET_PROFESSIONAL_PLAN = /* GraphQL */ `
  query professionalPlan($filter: ProfessionalPlanFilter!) {
    professionalPlan(filter: $filter) {
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
  test('should return professional plan data from smartMEI website', async () => {
    const { query } = mockServer()

    const response = await query({
      query: GET_PROFESSIONAL_PLAN,
      variables: { filter: {
        siteUrl: 'https://www.smartmei.com.br'
      } }
    })
    
    const { transferDescription, transferPrice, queryDate } = response.data?.professionalPlan

    expect(transferDescription).toBe('https://www.smartmei.com.br')
    expect(transferPrice.BRL).toBeGreaterThan(transferPrice.EUR)
    expect(transferPrice.BRL).toBeGreaterThan(transferPrice.USD)
    shouldBe(new Date(queryDate), new Date())
  })
})
