import request from 'supertest';
import express from 'express';
import errorHandler from '../middlewares/errorHandler.js';

const app = express();

// Ruta que genera un error para probar el middleware de manejo de errores
app.get('/error', (req, res, next) => {
  const error = new Error('Test error');
  next(error);
});

// Middleware de manejo de errores
app.use(errorHandler);

describe('Error Handler Middleware', () => {
  it('debería devolver 500 y un mensaje de error', async () => {
    const res = await request(app).get('/error');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: 'Internal Server Error' });
  });
});
