import mongoose from 'mongoose';
import RoleModel from '../models/RoleModel'; 

describe('Role Model', () => {
  it('debería tener el campo name definido como requerido', () => {
    const role = new RoleModel({});

    const error = role.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('name');
  });

  it('debería crear un rol con el campo name proporcionado', () => {
    const roleName = 'Administrador';

    const role = new RoleModel({
      name: roleName
    });

    expect(role.validateSync()).toBeUndefined();
    expect(role.name).toEqual(roleName);
  });
});
