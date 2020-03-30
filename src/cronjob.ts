import runCrawler from './modules/professionalPlan/crawler'
import { CronJob } from 'cron'

const cronjob = new CronJob('0 0 */23 * * *', runCrawler)

const start = async () => {
  await runCrawler()

  cronjob.start()
}

export default start