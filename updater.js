let utils = require('./utils')
let logger = require('./utils/logger')
let cron = require('cron')
let CronJob = require('cron').CronJob;
// utils.followChannel('@StephenKing', 666)
// utils.getPlatforms()

let job = new CronJob({
    cronTime: '00 */2 * * * *',
    onTick: function() {
        utils.updatePosts().then(() => {
            logger.info(`Posts was updated...`)
        })
    },
    start: false,
    timeZone: 'Europe/Moscow'
})
job.start()

logger.info(`Posts was updated...`)