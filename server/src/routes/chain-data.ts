import express, { Request, Response, NextFunction } from 'express';
import chainDataModel from '../models/chain-data-model';
import { getBalance } from '../chains/ethereum/etherscan';

const router = express.Router();

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    let data = [];
    try {
      const chainData = await chainDataModel.find();
      const promises = chainData.map(async (item) => {
        const balance = await getBalance(item.address, item.symbol);
        return {
          id: item._id,
          address: item.address,
          symbol: item.symbol,
          balance: balance,
        };
      });
      data = await Promise.all(promises);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500);
      }
    }
  })
  .post(
    async (
      req: Request<{}, {}, { address: string; symbol: string }, {}>,
      res: Response
    ) => {
      const chainData = new chainDataModel({
        address: req.body.address,
        symbol: req.body.symbol,
      });

      try {
        const newChainData = await chainData.save();
        res.status(201).json(newChainData);
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(400);
        }
      }
    }
  );

router
  .route('/:id')
  .get(getChainDataRecord, async (req: Request, res: Response) => {
    try {
      const balance = await getBalance(
        res.locals.chainData.address,
        res.locals.chainData.symbol
      );
      res.json({
        address: res.locals.chainData.address,
        symbol: res.locals.chainData.symbol,
        balance: balance,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500);
      }
    }
  })
  .delete(getChainDataRecord, async (req: Request, res: Response) => {
    try {
      await res.locals.chainData.remove();
      res.json({ message: 'data chain record deleted' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500);
      }
    }
  });

// middlewares
async function getChainDataRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let chainData;
  try {
    chainData = await chainDataModel.findById(req.params.id);
    if (chainData === null) {
      return res.status(404).json('Cannot find chain data with this id');
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500);
    }
  }
  res.locals.chainData = chainData;
  next();
}

export default router;
