import express from 'express';
import 'dotenv/config';
import router from './src/routers/index.js';

const app = express();

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
