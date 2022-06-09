import express, { Request, Response, NextFunction } from 'express';
import chainDataModel from '../models/chain-data-model';
import {
  getChainHandler,
  ethereumChain,
  thetaChain,
  neo3Chain,
} from '../chains/chainUtils';

const router = express.Router();

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    let data = [];
    try {
      const chainData = await chainDataModel.find();
      const promises = chainData.map(async (item) => {
        const chainHandler = getChainHandler(item.chain);
        if (!chainHandler) {
          return res
            .status(400)
            .json({ message: 'chain or symbol not supported' });
        }

        let address = '0x';
        chainHandler.details.coins.every((coin) => {
          if (coin.symbol === item.symbol) {
            address = coin.address;
            return false;
          }
          return true;
        });

        const balance = await chainHandler.getBalance(
          item.account,
          item.symbol,
          address
        );

        return {
          id: item._id,
          chain: item.chain,
          account: item.account,
          symbol: item.symbol,
          balance: balance,
        };
      });

      data = await Promise.all(promises);

      data = data.filter((i) => i.balance !== -1);
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
    isChainDataRecordDuplicated,
    async (
      req: Request<
        {},
        {},
        { chain: string; account: string; symbol: string },
        {}
      >,
      res: Response
    ) => {
      const chainData = new chainDataModel({
        chain: req.body.chain,
        account: req.body.account,
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

router.route('/form-data').get((req: Request, res: Response) => {
  try {
    res.json({ chains: [ethereumChain, thetaChain, neo3Chain] });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500);
    }
  }
});

router
  .route('/:id')
  .get(getChainDataRecord, async (req: Request, res: Response) => {
    try {
      const chainHandler = getChainHandler(res.locals.chainData.chain);
      if (!chainHandler) {
        return res
          .status(400)
          .json({ message: 'chain or symbol not supported' });
      }

      let address = '0x';
      chainHandler.details.coins.every((coin) => {
        if (coin.symbol === res.locals.chainData.symbol) {
          address = coin.address;
          return false;
        }
        return true;
      });
      const balance = await chainHandler.getBalance(
        res.locals.chainData.account,
        res.locals.chainData.symbol,
        address
      );
      if (balance === -1) {
        return res.status(429).json({ message: 'Max rate limit reached' });
      } else if (balance === -2) {
        return res.status(502).json({ message: 'Service Unavailable' });
      }
      res.json({
        id: res.locals.chainData._id,
        account: res.locals.chainData.account,
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

async function isChainDataRecordDuplicated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const record = await chainDataModel
    .findOne({ account: req.body.account, symbol: req.body.symbol })
    .exec();
  if (record !== null) {
    return res.status(400).json({ message: 'this record already exist.' });
  }
  next();
}

export default router;
