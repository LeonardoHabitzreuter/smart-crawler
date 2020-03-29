import ProfessionalPlanResolver from './professionalPlan/resolvers'
import { buildSchemaSync } from 'type-graphql'

export const schema = buildSchemaSync({
  resolvers: [
    ProfessionalPlanResolver
  ]
})
