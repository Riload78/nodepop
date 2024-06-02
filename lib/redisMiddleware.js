const { createClient } = require('redis')
const customLogger = require('../lib/winstonConfig')

const redisClient = createClient()
const redisConnect = async () => {
  try {
		await redisClient.connect()
		console.log('Connected to Redis');
		customLogger.info('Connected to Redis')
  } catch (error) {
		customLogger.error(error)
	}
}

const redisMiddleware = async (req, res, next) => {
  try {
    await redisConnect()
    req.client = redisClient
    next()
  } catch (error) {
    customLogger.error(`Error in middleware Redis: ${error}`)
  }
}
module.exports = { redisMiddleware }
