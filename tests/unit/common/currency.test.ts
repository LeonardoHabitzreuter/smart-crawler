import { mockAxios } from '../../helpers/mocks'

const { get } = mockAxios()
const { convertBRLValue } = require('~/common/currency')

describe('convertBRLValue', () => {
  test('should convert BRL value into EUR and USD currencies', async () => {
    const rates = { EUR: 0.178874877, USD: 0.1963509525 }
    get.mockReturnValue(Promise.resolve({ data: { rates } }))
    const response = convertBRLValue(7.65)

    expect(get).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ params: { base: 'BRL', symbols: expect.anything() } })
    )

    await expect(response).resolves.toMatchObject({
      BRL: 7.65,
      EUR: 1.37,
      USD: 1.5,
    })
  })
})
