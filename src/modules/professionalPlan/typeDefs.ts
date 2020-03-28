import { Field, ObjectType, InputType, Float } from 'type-graphql'

@ObjectType()
export class TransferPrice {
  @Field(_type => Float)
  BRL: number

  @Field(_type => Float)
  USD: number

  @Field(_type => Float)
  EUR: number
}

@InputType()
export class ProfessionalPlanFilter {
  @Field()
  siteUrl: string
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
