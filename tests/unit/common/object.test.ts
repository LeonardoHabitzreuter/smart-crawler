import { removeUndefinedProps } from '~/common/object'

describe('removeUndefinedProps', () => {
  test('should return an object with no undef props', () => {
    const response = removeUndefinedProps({ a: 1, b: undefined })

    expect(response).toMatchObject({ a: 1 })
    expect(response).not.toHaveProperty('b')
  })

  test.each([
    [undefined],
    [null]
  ])('should return an empty object when param is nil', (obj: undefined | null) => {
    const response = removeUndefinedProps(obj)

    expect(typeof response).toBe('object')
  })
})
