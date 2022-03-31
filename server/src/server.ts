import express, { Request, Response } from 'express';
import chainDataRouter from './routes/chain-data';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/chain-data', chainDataRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
