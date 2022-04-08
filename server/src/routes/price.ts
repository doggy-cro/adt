import express, { Request, Response, NextFunction } from 'express';
import { client } from '../price_api/coinpaprika';

const router = express.Router();

router
  .route('/')
  .get(handleCoinpaprikaApi, async (req: Request, res: Response) => {
    try {
      res.json(res.locals.records);
    } catch (error) {
      res.status(500);
    }
  });

// middlewares
async function handleCoinpaprikaApi(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let records: Array<string | Object> = [];
  try {
    const ticker: string | any = req.query.ticker;
    if (ticker === undefined) {
      records = await client.getAllTickers();
    } else {
      if (ticker.includes(',')) {
        records = await client.getAllTickers();
        const tickers: Array<string> = ticker.split(',');
        records = records.filter((item) => {
          if (!tickers.includes(item.id)) {
            return false;
          }
          return true;
        });
      } else {
        records = await client.getAllTickers({ coinId: req.query.ticker });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500);
    }
  }
  res.locals.records = records;
  next();
}

export default router;
