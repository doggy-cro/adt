import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import chainDataRouter from './routes/chain-data';
import priceRouter from './routes/price';

dotenv.config();

const app = express();
const port = process.env.PORT;

if (typeof process.env['DATABASE_URL'] === 'string') {
  mongoose.connect(process.env.DATABASE_URL);
} else {
  mongoose.connect('mongodb://localhost');
}

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(cors());
// @ts-ignore
app.options('*', cors());

app.use(express.json());
app.use('/chain-data', chainDataRouter);
app.use('/price', priceRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
