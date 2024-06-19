import { getUserById, deleteUserById } from '../controllers/UsersController.js';


  describe('Obtener un Usuario por ID', () => {
    it('Debería obtener un usuario por ID', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });



  describe('Eliminar un Usuario', () => {
    it('Debería eliminar un usuario', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteUserById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });


