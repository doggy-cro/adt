/* 
routing for:
  /chain-data

route: /
  methods:
    POST
      desc: write chain-data record
      data: {address, symbol}
    GET
      get all chain data records

route: /:id
  methods:
    GET
      desc: get particular chain-data record
    DELETE
      desc: delete particular chain-data record

route: /?coin-name
  methods:
    GET
      desc: get info about all records associated with particular coin name
*/

import express, { Request, Response } from 'express';

const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    console.log(req.query);
    res.send('get all records');
  })
  .post((req: Request, res: Response) => {
    console.log(req.body);
    res.send(`create record`);
  });

router
  .route('/:id')
  .get((req: Request, res: Response) => {
    res.send(`get record with id ${req.params.id}`);
  })
  .delete((req: Request, res: Response) => {
    res.send(`detele record with id: ${req.params.id}`);
  });

router.param('id', (req, res, next, id) => {
  console.log(id);
  next();
});

export default router;
