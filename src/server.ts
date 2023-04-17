/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable import/first */
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
// import config from './Config/default';
import bodyParser from 'body-parser';
import cors from 'cors';
// import create from 'http-errors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import IndexRouter from './routes/index';


class App {
  // eslint-disable-next-line prettier/prettier
  private readonly app: Application;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(cookieParser());
  }

  private routes(): void {
    const indexRouter = new IndexRouter();

    this.app.use(indexRouter.getRouter());
  }

  public start(): void {
    this.app.listen(this.port, (): void => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/strict-boolean-expressions
const server = new App(Number(process.env.PORT) || 3000);
server.start();
