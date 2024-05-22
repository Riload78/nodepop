const nodeMailer = require("nodemailer");
const emailConfig = async () => {
	const testAccount = await nodeMailer.createTestAccount();

	const developerOptions = {
		host: testAccount.smtp.host,
		port: testAccount.smtp.port,
		secure: testAccount.smtp.secure,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	};

	const productionOptions = {
		service: "smtp.ethereal.email",
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	};

	const transporter = nodeMailer.createTransport(
		process.env.NODE_ENV === "production" ? productionOptions : developerOptions
	);

	return transporter;
};

module.exports = emailConfig;
