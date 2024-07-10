const amqplib = require('amqplib')
const EXCHANGE_NAME = 'peticion-tarea'
const customLogger = require('../winstonConfig')
require('dotenv').config()

const publisher = async (data, type) => {
  try {
    // Verificar la variable de entorno AMQP_URL
    if (!process.env.AMQP_URL) {
      throw new Error('AMQP_URL no está definida en el entorno')
    }

    console.log('AMQP_URL:', process.env.AMQP_URL)

    // Crear conexión con el broker
    const connection = await amqplib.connect(process.env.AMQP_URL)
    console.log('Channel connection established:', connection)

    // Crear canal
    const channel = await connection.createChannel()

    // Chequear que existe el exchange
    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true })

    console.log('Publisher running')

    // Publicar
    const message = {
      data,
    }

    if (data) {
      channel.publish(
        EXCHANGE_NAME,
        type,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true,
        },
      )
      customLogger.info('Enviado', message)
    }
  } catch (error) {
    console.error('Error en publisher:', error)
    customLogger.error(error)
  }
}

publisher()

module.exports = publisher
