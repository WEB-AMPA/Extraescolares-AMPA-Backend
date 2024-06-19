import mongoose from 'mongoose';
import ActivitiesStudentsModel from '../models/ActivitiesStudentsModel'; 

describe('ActivitiesStudentsModel', () => {
    it('debería lanzar un error si falta un campo requerido', () => {
    const activityStudent = new ActivitiesStudentsModel({
    });

    expect(activityStudent.validateSync()).toBeDefined();
  });
});
