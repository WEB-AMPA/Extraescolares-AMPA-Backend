import request from 'supertest';
import express from 'express';
import { validateUser, validateCategory } from '../middlewares/validationMiddleware.js';

const app = express();
app.use(express.json());


app.post('/user', validateUser, (req, res) => {
  res.status(200).send('Usuario válido');
});

app.post('/category', validateCategory, (req, res) => {
  res.status(200).send('Categoría válida');
});

describe('Validation Middleware', () => {
  describe('validateUser', () => {
    it('debería devolver 200 para un usuario válido', async () => {
      const validUser = {
        username: 'johndoe',
        email: 'john@example.com',
        roleName: 'admin',
        lastname: 'Doe',
        name: 'John',
        phone_number: '1234567890', 
        partner_number: 123 
      };

      const res = await request(app).post('/user').send(validUser);
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Usuario válido');
    });

    it('debería devolver 400 para un usuario no válido', async () => {
      const invalidUser = {
        username: '',
        email: 'invalid-email',
        roleName: 'partner',
        lastname: '',
        name: '',
      };

      const res = await request(app).post('/user').send(invalidUser);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('validateCategory', () => {
    it('debería devolver 200 para una categoría válida', async () => {
      const validCategory = {
        name: 'Music'
      };

      const res = await request(app).post('/category').send(validCategory);
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Categoría válida');
    });

    it('debería devolver 400 para una categoría no válida', async () => {
      const invalidCategory = {};

      const res = await request(app).post('/category').send(invalidCategory);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBeDefined();
    });
  });
});
