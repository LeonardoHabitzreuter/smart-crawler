import { ApolloServer } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { schema } from '~/modules/index'

export const mockServer = () => {
  const server = new ApolloServer({ schema })

  return createTestClient(server)
}

export const mockAxios = () => {
  const get = jest.fn()
  const mockedObj = { get }

  jest.mock('axios', () => mockedObj)

  return mockedObj
}
