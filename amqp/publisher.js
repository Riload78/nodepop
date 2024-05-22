const ampqlib = require("amqplib");
const env = require('dotenv').config()
const EXCHANGE_NAME = "peticion-tarea";
const publisher = async () => {
	console.log('Publisher running');
	// crear conexions con el broker
	const connection = await ampqlib.connect(process.env.AMQP_URL);
	// crear canal
	const channel = await connection.createChannel();
	
	//chequear que existe el exchange
	await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
	
	// publicar
	const message = {
		tarea : 'enviar email',
	}
	const resize = {
		tarea : 'redimensionar imagen',
	}

	channel.publish(EXCHANGE_NAME, 'email', Buffer.from(JSON.stringify(message)),{
		persistent: true
	})
	channel.publish(
		EXCHANGE_NAME,
		"resize-image",
		Buffer.from(JSON.stringify(resize)),
		{
			persistent: true,
		}
	);

	console.log("Enviado", message);
	console.log("Enviado", resize);
}
publisher()

module.exports = { publisher }
