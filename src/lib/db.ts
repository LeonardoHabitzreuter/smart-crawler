import Redis from 'ioredis'

const { NODE_ENV, DATABASE_URL, TEST_DATABASE_URL } = process.env

export const PROFESSIONAL_PLAN = 'professional_plan'

export default new Redis(
  NODE_ENV === 'test'
    ? TEST_DATABASE_URL || 'redis://:@localhost:6379/1'
    : DATABASE_URL || 'redis://:@localhost:6379/0'
)
