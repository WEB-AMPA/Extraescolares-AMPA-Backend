import mongoose from 'mongoose';
import Category from '../models/CategoriesModel'; 

describe('Category Model', () => {
  it('debería tener el campo name definido como requerido', () => {
   
    const category = new Category({});

    const error = category.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('name');
  });

  it('debería crear una categoría con el campo name proporcionado', () => {
   
    const categoryName = 'Deportes';
    const category = new Category({ name: categoryName });

    expect(category.validateSync()).toBeUndefined();
    expect(category.name).toEqual(categoryName);
  });
});
