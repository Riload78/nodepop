const ampqlib = require("amqplib");
const env = require("dotenv").config();
const QUEUE_NAME = "enviar-email";

const consumer = async () => {
    console.log('Consumer running');
    const connection = await ampqlib.connect(process.env.AMQP_URL)
    const channel = await connection.createChannel()

    // asegurar que existe la cola de entrada
    await channel.assertQueue(QUEUE_NAME, { durable: true })

    channel.consume(QUEUE_NAME, message => {
        console.log(`Received message: ${message.content.toString()}`)
    }, {
        noAck: true
    })


}

consumer()

module.exports = consumer