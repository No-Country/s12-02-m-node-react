import { mailController } from '../controllers/mailController.js';
import express from 'express';
const router = express.Router();

router.post('/', mailController);

module.exports = router;
