import loadData from '~/common/loadData'

describe('loadData', () => {
  const get = jest.fn(a => a)

  afterEach(get.mockClear)

  test('should call get function only once when param is the same', async () => {
    const cachedGet = loadData(get)

    const response = await cachedGet.load('1')
    const response2 = await cachedGet.load('1')

    expect(response).toBe('1')
    expect(response2).toBe('1')
    expect(get).toHaveBeenCalledTimes(1)
  })

  test('should call get function every time the param is different', async () => {
    const cachedGet = loadData(get)

    const response = await cachedGet.load('1')
    const response2 = await cachedGet.load('2')

    expect(response).toBe('1')
    expect(response2).toBe('2')
    expect(get).toHaveBeenCalledTimes(2)
  })

  test('should clear the cache after 1 millisecond', async () => {
    process.env.CLEAR_DATALOADER_INTERVAL = '1'
    const cachedGet = loadData(get)

    const callLoad = (param: string) => new Promise(resolve => {
      setTimeout(async () => resolve(
        await cachedGet.load(param)
      ), 2)
    })

    const response = await callLoad('1')
    const response2 = await callLoad('1')

    expect(response).toBe('1')
    expect(response2).toBe('1')
    expect(get).toHaveBeenCalledTimes(2)
    process.env.CLEAR_DATALOADER_INTERVAL = ''
  })
})
