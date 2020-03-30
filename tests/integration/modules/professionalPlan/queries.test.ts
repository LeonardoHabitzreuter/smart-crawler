import 'reflect-metadata'
import 'dotenv/config'
import createServer from '../../helpers/createServer'
import '../../helpers/mocks'
import { clear, closeConnection } from '../../helpers/db'

const CREATE_PRODUCT = /* GraphQL */ `
  mutation createProduct($input: ProductInput!){
    createProduct(input: $input)
  }
`

const GET_PRODUCT = /* GraphQL */ `
  query product($filter: ProductFilter!) {
    product(filter: $filter) {
      name
      stock
    }
  }
`

describe('create and query a product', () => {
  beforeEach(clear)
  afterAll(closeConnection)

  test('should create a product and return its data', async () => {
    const { mutate, query } = await createServer()
    const product = {
      name: 'Product',
      stock: 8
    }

    const productRequest = await mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: product }
    })

    const productId = productRequest.data?.createProduct

    const getProduct = await query({
      query: GET_PRODUCT,
      variables: { filter: {
        id: productId
      } }
    })

    expect(getProduct.data?.product).toMatchObject(product)
  })
})
