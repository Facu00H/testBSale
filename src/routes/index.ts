import { Router, Response } from 'express';
import { checkIn } from '../controllers/checkIn';
// import { pool } from '../sqlConnection';

export default class IndexRouter {
  // eslint-disable-next-line prettier/prettier
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {

    this.router.get('/', (_req, res: Response) => {
      res.send('hello world');
    });

    this.router.get('/check/:id', checkIn);
  }
  public getRouter(): Router {
    return this.router;
  }
}