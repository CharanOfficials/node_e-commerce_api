import fs from 'fs'
const fsPromise = fs.promises

async function log(logData) {
    try {
        logData = `\n ${new Date().toString()} ${logData}`
        await fsPromise.appendFile('log.txt', logData)
    } catch (err) {
        console.log(err)
    }
}

const loggerMiddleware = async (req, res, next) => {
    // 1. Log request body and avoid sign in logs
    if (!req.url.includes('signin')) {
        const logData = `${req.url} ...Log Data...==> ${JSON.stringify(req.body)}`
        await log(logData)   
    }
    next()
}

export default loggerMiddleware