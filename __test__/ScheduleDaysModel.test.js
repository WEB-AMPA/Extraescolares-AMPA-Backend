import mongoose from 'mongoose';
import ScheduleDaysModel from '../models/ScheduleDaysModel'; 

describe('ScheduleDays Model', () => {
  it('debería tener el campo days definido como requerido', () => {
 
    const scheduleDay = new ScheduleDaysModel({});

    const error = scheduleDay.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('days');
  });

  it('debería crear un registro de día de horario con el campo days proporcionado', () => {

    const scheduleDayValue = 'Lunes';

    const scheduleDay = new ScheduleDaysModel({
      days: scheduleDayValue
    });
    
    expect(scheduleDay.validateSync()).toBeUndefined();
    expect(scheduleDay.days).toEqual(scheduleDayValue);
  });
});
