import BookingsManager from '../dao/managerBookings.js';
import BookingsModel from '../models/bookingsModel.js';
import { ObjectId } from 'mongodb';
const bookingsmanager = new BookingsManager();

// This controller is for creating a booking
async function createBookingController(req, res) {
	try {
		const data = req.body;
		const validateError = BookingsModel(data).validateSync();
		if (validateError) {
			throw validateError;
		}
		await bookingsmanager.createBooking(data);
		return res.status(200).json({
			data: {},
			status: 0,
			message: 'Se han guardado con éxito la reserva.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller return all bookings, the query is optional for data subsets
async function getAllBookingsController(req, res) {
	try {
		const queryParams = req.query;
		// let query = {};
		// if (queryParams.email) {
		// 	query = { email: queryParams.email };
		// } else {
		// 	query = queryParams;
		// }
		console.log(queryParams);
		const allBookings = await bookingsmanager.getAllBookings(queryParams);
		if (allBookings.length === 0) throw new Error('No hay reservas para mostrar');
		return res.status(200).json({
			data: allBookings,
			status: 0,
			message: 'Se han encontrado las siguientes reservas.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller return one booking that match the query (por id o title)
async function getOneBookingController(req, res) {
	try {
		const queryParams = req.query;
		let query;
		if (queryParams.id) {
			const bookingId = new ObjectId(queryParams.id);
			query = { _id: bookingId };
		} else if (queryParams.email) {
			query = { email: queryParams.email };
		} else {
			throw new Error('No hay reservas.');
		}
		const oneBooking = await bookingsmanager.getOneBooking(query);
		if (!oneBooking)
			throw new Error('No hay reserva para mostrar que coincidan con sus criterios de búsqueda.');
		return res.status(200).json({
			data: oneBooking,
			status: 0,
			message: 'Se han encontrado la siguiente reserva.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controoler update one booking that match the filter
async function updateBookingController(req, res) {
	try {
		const { dataUpdate, filter } = req.body;
		let query;
		if (filter._id) {
			const bookingId = new ObjectId(filter._id);
			query = { _id: bookingId };
		}
		const result = await bookingsmanager.updatebooking(query, dataUpdate);
		if (result.matchedCount > 0) {
			const bookingUpdated = await bookingsmanager.getOneBooking(filter);
			return res.status(200).json({
				data: bookingUpdated,
				status: 0,
				message: 'Reserva actualizada con éxito',
			});
		} else {
			return res.status(400).json({
				data: {},
				status: 1,
				message: 'No se pudo realizar la actualización.',
			});
		}
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller delete one booking physically (mode = 0) or logically (mode = 1)
async function deleteBookingController(req, res) {
	try {
		const { mode, id } = req.params;
		let result;
		let filter = {};
		const bookingId = new ObjectId(id);
		filter = { _id: bookingId };
		if (mode === 0) {
			result = await bookingsmanager.deleteBooking(filter);
		} else {
			result = await bookingsmanager.updateBooking(filter, { active: false });
		}
		if (result.deletedCount > 0 || result.matchedCount > 0) {
			const action = mode === 0 ? 'físicamente' : 'lógicamente';
			const bookingDeleted = await bookingsmanager.getOnePublication(filter);
			const successMessage = `La publicación ha sido eliminada exitosamente. ${action}.`;

			return res.status(200).json({
				data: bookingDeleted,
				status: 0,
				message: successMessage,
			});
		} else {
			const errorMessage = 'No se encontró ninguna publicación para eliminar con ese filtro.';
			return res.status(404).json({
				data: {},
				status: 1,
				message: errorMessage,
			});
		}
	} catch (error) {
		const errorMessage = 'Se produjo un error al procesar la solicitud.';
		return res.status(400).json({
			data: {},
			status: 1,
			message: errorMessage,
		});
	}
}

export {
	createBookingController,
	getAllBookingsController,
	getOneBookingController,
	updateBookingController,
	deleteBookingController,
};
