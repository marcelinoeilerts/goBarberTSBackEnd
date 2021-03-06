import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';

import AppError from './errors/AppError';

import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

// app.get('/', (request, response) => response.json({ message: 'Hello World 2' }));

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
