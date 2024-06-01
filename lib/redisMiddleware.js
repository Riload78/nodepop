require('dotenv').config()
const { createClient } = require('redis')
const redisUrl = process.env.REDIS_URL
const customLogger = require('../lib/winstonConfig')

const redisClient = createClient()
const redisConnect = async () => {
  try {
		await redisClient.connect()
		console.log('Connected to Redis');
		customLogger.info('Connected to Redis')
  } catch (error) {
		console.error(error)
		customLogger.error(error)
	}
}

const redisDisconnect = async () => {
	try {
		await redisClient.quit()
		console.log('Disconnected from Redis');
		customLogger.info('Disconnected from Redis')
	} catch (error) {
		console.error(error)
		customLogger.error(error)
	}
}

const redisMiddleware = async (req, res, next) => {
  try {
    await redisConnect()
    req.client = redisClient
    next()
  } catch (err) {
    console.log(err)
    customLogger.error('Error in middleware', err)
  }
}
module.exports = { redisMiddleware }
