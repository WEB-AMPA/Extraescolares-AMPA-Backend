import mongoose from 'mongoose';
import AttendanceModel from '../models/AttendanceModel'; 

describe('AttendanceModel', () => {
  
    it('debería lanzar un error si falta un campo requerido', () => {
      
      const attendance = new AttendanceModel({});
  
      const error = attendance.validateSync();
      expect(error).toBeDefined();
      expect(error.errors).toHaveProperty('date');
      expect(error.errors).toHaveProperty('attendance');
      expect(error.errors).toHaveProperty('activities_student');
    });
  });