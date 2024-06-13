import ScheduleDaysController from '../controllers/ScheduleDaysController.js';

describe('Controlador de Días de Horario', () => {

  describe('Obtener Día de Horario por ID', () => {
    it('Debería obtener un día de horario por ID', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ScheduleDaysController.getScheduleDayById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('Actualizar Día de Horario por ID', () => {
    it('Debería actualizar un día de horario por ID', async () => {
      const req = {
        params: {
          id: '1234567890'
        },
        body: {
          days: 'Prueba'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ScheduleDaysController.updateScheduleDayById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('Eliminar Día de Horario por ID', () => {
    it('Debería eliminar un día de horario por ID', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ScheduleDaysController.deleteScheduleDayById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});