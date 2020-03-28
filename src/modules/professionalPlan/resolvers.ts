import ProfessionalPlanTypeDef, { TransferPrice, ProfessionalPlanFilter } from './typeDefs'
import { Query, Resolver, Arg, FieldResolver, Root } from 'type-graphql'
import { find, convertTransferPrice } from './queries'
import { ProfessionalPlan } from './types'

@Resolver(_of => ProfessionalPlanTypeDef)
export default class ProfessionalPlanResolver {
  @Query(_returns => ProfessionalPlanTypeDef)
  professionalPlan(
    @Arg('filter', { nullable: false }) filter: ProfessionalPlanFilter
  ) {
    return find(filter)
  }

  @FieldResolver()
  transferPrice(
    @Root() plan: ProfessionalPlan
  ): Promise<TransferPrice> {
    return convertTransferPrice(plan.transferPrice)
  }
}
