class ApolloServer {
  public listen() {

    return Promise.resolve({ url: 'mocked url' })
  }
}

export const mockApolloServer = () => {
  jest.mock('apollo-server', () => ({
    toApolloError: jest.fn(),
    ApolloServer
  }))
}

export const mockAxios = () => {
  const get = jest.fn()
  const mockedObj = { get }

  jest.mock('axios', () => mockedObj)

  return mockedObj
}
