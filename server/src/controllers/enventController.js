import EventManager from '../dao/managerEvent.js';

const eventmananger = new EventManager();

async function createEvent(req, res) {
	try {
		const data = req.body;
		const newEvent = await eventmananger.createEvent(data);

		return res.status(200).json(newEvent);
	} catch (error) {
		return res.status(400).send(error);
	}
}

export { createEvent };
