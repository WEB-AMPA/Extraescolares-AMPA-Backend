import ScheduleHoursController from '../controllers/ScheduleHoursController.js';

describe('Controlador de Horarios', () => {


  describe('Obtener Horario por ID', () => {
    it('Debería obtener un horario por ID', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ScheduleHoursController.getScheduleHourById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('Actualizar Horario', () => {
    it('Debería actualizar un horario', async () => {
      const req = {
        body: {
          range: 'Prueba'
        },
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ScheduleHoursController.updateScheduleHour(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('Eliminar Horario', () => {
    it('Debería eliminar un horario', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ScheduleHoursController.deleteScheduleHour(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});