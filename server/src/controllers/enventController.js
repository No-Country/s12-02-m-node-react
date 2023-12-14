import EventManager from '../dao/managerEvent.js';
import EventModel from '../models/eventModel.js';
import { uploadImage } from '../utils/cloudinary.js';

const eventmananger = new EventManager();

async function createEvent(req, res) {
	console.log(req.body);
	try {
		const {
			email,
			title,
			description,
			capacity,
			dates,
			startHour,
			endHour,
			modality,
			location,
			category,
			price,
			minimumAge,
		} = req.body;

		console.log(dates);
		const data = {
			email,
			title,
			description,
			capacity: parseInt(capacity, 10),
			dates,
			startHour,
			endHour,
			modality,
			location,
			category,
			price: parseInt(price, 10),
			minimumAge: parseInt(minimumAge, 10),
		};

		const validateError = EventModel(data).validateSync();
		if (validateError) {
			throw validateError;
		}

		const imgArr = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
		const images = await Promise.all(
			imgArr.map(async file => {
				return await uploadImage(file.data);
			})
		);

		data.pictures = images;

		const response = await eventmananger.createEvent(data);

		return res.status(200).json({
			data: response,
			message: 'Evento creado con éxito',
			status: 0,
		});
	} catch (error) {
		return res.status(400).send({
			status: 1,
			message: error.message,
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
			message: error.message,
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
			message: 'Evento encontrado',
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
