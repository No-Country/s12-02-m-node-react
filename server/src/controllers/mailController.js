import sendMail from '../middleware/sendmail.js';

async function mailController(req, res) {
	try {
		const dataMail = req.body;
		const response = await sendMail(dataMail);
		return res.status(200).json({
			data: response,
			status: 0,
			message: 'El correo electrónico se envió correctamente.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: `Error al enviar el correo de contacto: ${error}`,
		});
	}
}

export default {
	mailController,
};
