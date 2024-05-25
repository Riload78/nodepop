const ampqlib = require('amqplib')
const QUEUE_NAME = 'nodepop-tasks'
const nodemailer = require('nodemailer')
const emailConfig = require('../emailConfig')
const thumbnailCreate = require('../thumbnailCreate')

const consumer = async () => {
  console.log('Consumer running')
  try {
    const connection = await ampqlib.connect(process.env.AMQP_URL)
    const channel = await connection.createChannel()

    // asegurar que existe la cola de entrada
    await channel.assertQueue(QUEUE_NAME, { durable: true })

    channel.consume(QUEUE_NAME, async (message) => {
      const payload = JSON.parse(message.content.toString())
      const type = message.fields.routingKey

      if (type === 'email') {
        const { email, subject, body } = payload.data
        await sendEmail(email, subject, body)
      }

      if (type === 'resize') {
        console.log('Resize', payload.data)
        const { image } = payload.data
        thumbnailCreate(image)
      }

      channel.ack(message)
    })
  } catch (error) {
    console.log(error)
  }
}

const sendEmail = async (email, subject, body) => {
  const transporter = await emailConfig()

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    html: body
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${email}`)
    console.log(`URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`
    )
  } catch (error) {
    console.log(`Error sending email: ${error}`)
  }
}

consumer()

module.exports = consumer
