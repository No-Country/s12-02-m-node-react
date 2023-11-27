import EventManager from '../dao/managerEvent.js';

const eventmananger = new EventManager();

async function createEvent(req, res) {
	try {
		const data = req.body;
		const response = await eventmananger.createEvent(data);

		return res.status(200).json({
			message: response,
			status: 0,
		});
	} catch (error) {
		return res.status(400).send({
			status: 1,
			message: error,
		});
	}
}

async function getAllEvents(req, res) {
	try {
		const allEvents = await eventmananger.getAllEvents(req.query);
		return res.status(200).json({
			data: allEvents,
			status: 0,
		});
	} catch (error) {
		return res.status(400).send({
			status: 1,
			message: error,
		});
	}
}

async function getOneEvent(req, res) {
	const { _id } = req.params;
	try {
		const event = await eventmananger.getOneEvent(_id);
		if (!event) {
			return res.status(400).json({
				message: 'Evento no encontrado',
				status: 1,
			});
		}
		return res.status(200).json({
			data: event,
			status: 0,
		});
	} catch (error) {
		return res.status(400).send({
			status: 1,
			message: error.message,
		});
	}
}

async function deleteEvent(req, res) {
	const { _id } = req.params;
	try {
		const deletedEvent = await eventmananger.deleteEvent(_id);
		return res.status(200).json({
			data: deletedEvent,
			status: 0,
			message: 'Evento eliminado con éxito',
		});
	} catch (error) {
		return res.status(400).send({
			status: 1,
			message: error.message,
		});
	}
}

async function updateEvent(req, res) {
	const { _id } = req.params;
	const { body } = req;
	try {
		const response = await eventmananger.updateEvent(_id, body);
		res.status(200).json({
			status: 0,
			message: response,
		});
	} catch (error) {
		return res.status(400).send({
			status: 1,
			message: error.message,
		});
	}
}
export { createEvent, getAllEvents, getOneEvent, deleteEvent, updateEvent };
