import express, { Request, Response, NextFunction } from 'express';
import chainDataModel from '../models/chain-data-model';

const router = express.Router();

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const chainData = await chainDataModel.find();
      res.json(chainData);
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
  .get(getChainDataRecord, (req: Request, res: Response) => {
    res.json(res.locals.chainData);
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
