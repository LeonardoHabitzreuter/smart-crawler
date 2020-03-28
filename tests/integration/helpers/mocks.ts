class ApolloServer {
  public listen() {

    return Promise.resolve({ url: 'mocked url' })
  }
}

jest.mock('apollo-server', () => ({
  toApolloError: jest.fn(),
  ApolloServer
}))
