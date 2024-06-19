import mongoose from 'mongoose';
import ScheduleHoursModel from '../models/ScheduleHoursModel';

describe('ScheduleHours Model', () => {
  it('debería tener el campo range definido como requerido', () => {
    const scheduleHour = new ScheduleHoursModel({});

    const error = scheduleHour.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('range');
  });

  it('debería crear un registro de hora de horario con el campo range proporcionado', () => {
    const scheduleHourValue = '09:00 - 10:00';

    const scheduleHour = new ScheduleHoursModel({
      range: scheduleHourValue
    });

    expect(scheduleHour.validateSync()).toBeUndefined();
    expect(scheduleHour.range).toEqual(scheduleHourValue);
  });
});
