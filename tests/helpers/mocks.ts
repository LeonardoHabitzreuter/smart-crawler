import { ApolloServer } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

export const mockServer = () => {
  const { schema } = require('~/modules/index')
  const server = new ApolloServer({ schema })

  return createTestClient(server)
}

export const mockAxios = () => {
  const get = jest.fn()
  const mockedObj = { get }

  jest.mock('axios', () => ({
    create: () => mockedObj
  }))

  return mockedObj
}
