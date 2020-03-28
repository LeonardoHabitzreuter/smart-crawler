import ProfessionalPlanResolver from './professionalPlan/resolvers'
import { buildFederatedSchema } from '~/lib/buildFederatedSchema'

export const getSchema = buildFederatedSchema({
  resolvers: [
    ProfessionalPlanResolver
  ]
})
