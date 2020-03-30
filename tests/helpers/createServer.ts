import { ApolloServer } from 'apollo-server'
import { getSchema } from '~/modules/index'
import { createTestClient } from 'apollo-server-testing'

const createServer = async () => {
  const schema = await getSchema
  const server = new ApolloServer({ schema })

  return createTestClient(server)
}

export default createServer
