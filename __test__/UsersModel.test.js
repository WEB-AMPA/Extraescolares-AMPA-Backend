import mongoose from 'mongoose';
import UserModel from '../models/UsersModel'; 

describe('User Model', () => {
  it('debería tener los campos requeridos correctamente definidos', () => {
    
    const user = new UserModel({});

  
    const error = user.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('username');
    expect(error.errors).toHaveProperty('email');
    expect(error.errors).toHaveProperty('password');
    expect(error.errors).toHaveProperty('role');
    expect(error.errors).toHaveProperty('lastname');
    expect(error.errors).toHaveProperty('name');
  });

});
