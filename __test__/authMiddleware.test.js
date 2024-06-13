import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import UserModel from '../models/UsersModel';

const app = express();
app.use(express.json());


app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'Acceso concedido a admin' });
});

jest.mock('jsonwebtoken');
jest.mock('../models/UsersModel');

describe('Auth Middleware', () => {
  let token;

  beforeEach(() => {
    token = jwt.sign({ userId: '123' }, process.env.JWT_SECRET);
  });

  describe('authenticate', () => {
    it('debería devolver 401 si no se proporciona token', async () => {
      const response = await request(app).get('/admin');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Acceso denegado, token faltante.');
    });

    it('debería devolver 400 si el token es inválido', async () => {
      jwt.verify.mockImplementation(() => { throw new Error('Token inválido'); });
      const response = await request(app).get('/admin').set('Authorization', 'Bearer invalidToken');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Token inválido.');
    });

  });
  });
