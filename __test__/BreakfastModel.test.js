import mongoose from 'mongoose';
import BreakfastModel from '../models/BreakfastModel'; 

describe('Breakfast Model', () => {
  it('debería tener los campos requeridos correctamente definidos', () => {
    const breakfast = new BreakfastModel({});

    const error = breakfast.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('date');
    expect(error.errors).toHaveProperty('student_id');
    expect(error.errors).toHaveProperty('attendance');
  });

});
