import db from '~/lib/db'
export {
  start as startSchedule,
  stop as stopSchedule
} from '../../src/cronjob'

export const closeDBConnection = () => db.disconnect()