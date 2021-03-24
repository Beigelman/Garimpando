import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';
import { container } from 'tsyringe';
import CronServer from '../lib/CronServer';
import rateLimiter from './infra/http/middlewares/rateLimiter';

const cron = container.resolve(CronServer);

setTimeout(() => {
  cron.start();
}, 2000);

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  const code = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  return response.status(code).json({
    status: 'error',
    message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
