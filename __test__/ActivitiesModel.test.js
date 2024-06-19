import ActivitiesModel from '../models/ActivitiesModel';

describe('ActivitiesModel', () => {
  it('debería lanzar un error si falta un campo requerido', () => {
    const activity = new ActivitiesModel({
      monitor: 'monitor_id',
      categories: ['categoria_id'],
      scheduleDay: ['schedule_day_id'],
      scheduleHour: ['schedule_hour_id'],
      centers: ['centro_id'],
      assignments: [{
        student: 'student_id',
        studentName: 'Nombre del estudiante',
        studentLastname: 'Apellido del estudiante',
        category: 'categoria_id',
        scheduleDay: 'schedule_day_id',
        scheduleHour: 'schedule_hour_id',
        center: 'centro_id'
      }]
    });

    expect(activity.validateSync()).toBeDefined();
  });
});
