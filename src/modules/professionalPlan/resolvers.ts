import ProfessionalPlanTypeDef, { TransferPrice } from './typeDefs'
import { Query, Resolver, FieldResolver, Root } from 'type-graphql'
import { find, convertTransferPrice } from './queries'
import { ProfessionalPlan } from './types'

@Resolver(_of => ProfessionalPlanTypeDef)
export default class ProfessionalPlanResolver {
  @Query(_returns => ProfessionalPlanTypeDef)
  professionalPlan() {
    return find()
  }

  @FieldResolver()
  transferPrice(
    @Root() plan: ProfessionalPlan
  ): Promise<TransferPrice> {
    return convertTransferPrice(plan.transferPrice)
  }
}
