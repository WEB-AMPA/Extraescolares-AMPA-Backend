import mongoose from 'mongoose';
import Center from '../models/CentersModel'; 

describe('Center Model', () => {
  it('debería tener los campos requeridos correctamente definidos', () => {
    const center = new Center({});

    const error = center.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('name');
    expect(error.errors).toHaveProperty('address');
  });

  it('debería crear un centro con los campos proporcionados', () => {
    const centerName = 'Centro Deportivo';
    const centerAddress = 'Calle Principal, 123';

    const center = new Center({
      name: centerName,
      address: centerAddress
    });

    expect(center.validateSync()).toBeUndefined();
    expect(center.name).toEqual(centerName);
    expect(center.address).toEqual(centerAddress);
  });
});
