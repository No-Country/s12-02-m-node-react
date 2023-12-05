import { Router } from 'express';
import {
	createBookingController,
	getAllBookingsController,
	getOneBookingController,
	updateBookingController,
	deleteBookingController,
} from '../controllers/bookingsController';
const bookingsRouter = Router();

bookingsRouter.post('/', createBookingController);
bookingsRouter.get('/all', getAllBookingsController);
bookingsRouter.get('/one', getOneBookingController);
bookingsRouter.put('/update', updateBookingController);
bookingsRouter.delete('/delete/:mode/:id', deleteBookingController);

export { bookingsRouter };
