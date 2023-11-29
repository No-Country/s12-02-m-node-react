import express from 'express';
import 'dotenv/config';
import router from './src/routers/index.js';
import cors from 'cors';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
	readFileSync('../server/eventwave-ar-firebase-adminsdk-i8suk-1b96ec4c0c.json')
);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
