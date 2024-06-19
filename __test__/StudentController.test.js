import StudentsController from '../controllers/StudentController.js';

describe('Controlador de Estudiantes', () => {
 
  describe('Obtener Estudiante por ID', () => {
    it('Debería obtener un estudiante por ID', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await StudentsController.getStudentById(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });



  describe('Eliminar Estudiante', () => {
    it('Debería eliminar un estudiante', async () => {
      const req = {
        params: {
          id: '1234567890'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await StudentsController.deleteStudent(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });


});