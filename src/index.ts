import 'reflect-metadata'
import 'dotenv/config'
import './configAliases'
import { ApolloServer, toApolloError } from 'apollo-server'
import { GraphQLError } from 'graphql'
import { schema } from './modules/index'

const formatError = (error: GraphQLError) => {
  const { extensions } = error

  return extensions && extensions.exception
    ? toApolloError(error, extensions.exception.code)
    : error
}

const server = new ApolloServer({
  schema,
  formatError
})

const PORT = process.env.PORT || 3000
const serverConfig = { port: PORT, cors: { origin: '*' } }
server.listen(serverConfig).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})