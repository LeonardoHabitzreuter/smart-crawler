import { Field, ObjectType, Float } from 'type-graphql'

@ObjectType()
export class TransferPrice {
  @Field(_type => Float)
  BRL: number

  @Field(_type => Float)
  USD: number

  @Field(_type => Float)
  EUR: number
}

@ObjectType()
export default class ProfessionalPlan {
  @Field()
  queryDate: Date

  @Field()
  transferDescription: string

  @Field(_type => TransferPrice)
  transferPrice: TransferPrice
}
