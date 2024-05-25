const ampqlib = require('amqplib')
const EXCHANGE_NAME = 'peticion-tarea'
const publisher = async (data, type) => {
  console.log('Publisher running')
  try {
    // crear conexions con el broker
    const connection = await ampqlib.connect(process.env.AMQP_URL)
    // crear canal
    const channel = await connection.createChannel()

    // chequear que existe el exchange
    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true })

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
      console.log('Enviado', message)
    }

    // cerrar la conexión cuando se termina el proceso de publisher
  } catch (error) {
    console.log(error)
  }
}

publisher()

module.exports = publisher
