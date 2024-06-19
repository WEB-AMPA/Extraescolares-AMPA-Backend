import mongoose from 'mongoose';
import StudentModel from '../models/StudentModels'; 

describe('Student Model', () => {
  it('debería tener los campos requeridos correctamente definidos', () => {
    const student = new StudentModel({});

    const error = student.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('name');
    expect(error.errors).toHaveProperty('lastname');
    expect(error.errors).toHaveProperty('course');
    expect(error.errors).toHaveProperty('partner');
    expect(error.errors).toHaveProperty('center');
  });

});
