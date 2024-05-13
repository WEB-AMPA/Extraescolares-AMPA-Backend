import Category from '../models/CategoryModel.js';

export async function createCategory(categoryData) {
    try {
        const category = new Category(categoryData);
        await category.save();
        return category;
    } catch (error) {
        throw error;
    }
}

export async function getCategoryById(categoryId) {
    try {
        const category = await Category.findById(categoryId);
        return category;
    } catch (error) {
        throw error;
    }
}

export async function updateCategory(categoryId, newData) {
    try {
        const category = await Category.findByIdAndUpdate(categoryId, newData, { new: true });
        return category;
    } catch (error) {
        throw error;
    }
}

export async function deleteCategory(categoryId) {
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        return deletedCategory;
    } catch (error) {
        throw error;
    }
}