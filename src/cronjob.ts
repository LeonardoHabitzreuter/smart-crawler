import runCrawler from './modules/professionalPlan/crawler'
import { CronJob } from 'cron'

const cronjob = new CronJob('0 0 */23 * * *', runCrawler)

export const start = async () => {
  await runCrawler()

  cronjob.start()
}

export const stop = cronjob.stop