import { trim, replace } from '~/common/string'

describe('trim', () => {
  test('should trim the string white spaces', () => {
    const response = trim('  a  ')

    expect(response).toBe('a')
  })
})

describe('replace', () => {
  test('should replace comma by dot', () => {
    const response = replace(',', '.')('1,65')

    expect(response).toBe('1.65')
  })

  test('should do nothing when string has no comma', () => {
    const response = replace(',', '.')('9')

    expect(response).toBe('9')
  })
})
