import winston from 'winston'
import fs from 'fs'
const fsPromise = fs.promises

// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} ${logData}`
//         await fsPromise.appendFile('log.txt', logData)
//     } catch (err) {
//         console.log(err)
//     }
// }
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports: new winston.transports.File({filename:'logs.txt'})
})

const loggerMiddleware = async (req, res, next) => {
    // 1. Log request body and avoid sign in logs
    if (!req.url.includes('signin')) {
        const logData = `${req.url} ...Log Data...==> ${JSON.stringify(req.body)}`
        // await log(logData)   
        logger.info(logData)
    }
    next()
}

export default loggerMiddleware