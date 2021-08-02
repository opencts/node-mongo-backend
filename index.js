import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import createCrudRouter from './crud/crud.router';
import log from './generators/console/log';
import createSchemaRouter from './generators/schema/schema.router';
import dotenv from 'dotenv';
import expressWs from 'express-ws';

dotenv.config();

const app = express();
const wsInfo = expressWs(app).getWss();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).catch((err) => log.error('Unable to connect to Mongo database'));

createCrudRouter(app, wsInfo);
createSchemaRouter(app);

const PORT = process.env.PORT || 4300
app.listen(PORT, _ => log.success('Server is started'))