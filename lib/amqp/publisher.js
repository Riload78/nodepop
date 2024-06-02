const ampqlib = require('amqplib')
const EXCHANGE_NAME = 'peticion-tarea'
const customLogger = require('../winstonConfig')
const publisher = async (data, type) => {
  try {
    // crear conexions con el broker
    const connection = await ampqlib.connect(process.env.AMQP_URL)
    // crear canal
    const channel = await connection.createChannel()
    
    // chequear que existe el exchange
    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true })
    
    console.log('Publisher running')
    // publicar
    const message = {
      data
    }
    if (data) {
      channel.publish(
        EXCHANGE_NAME,
        type,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true
        }
      )
      customLogger.info('Enviado', message)
    }

  } catch (error) {
    console.log(error)
    customLogger.error(error)
  }
}

publisher()

module.exports = publisher
