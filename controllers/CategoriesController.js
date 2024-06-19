import Category from '../models/CategoriesModel.js';

class CategoriesController {
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const newCategory = new Category({ name });
            const savedCategory = await newCategory.save();
            res.status(201).json(savedCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al crear la categoría.' });
        }
    }

    async getAllCategories(req, res) {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener las categorías.' });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Categoría no encontrada.' });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener la categoría.' });
        }
    }

    async getCategoryByName(req, res) {
        try {
            const category = await Category.findOne({ name: req.params.name });
            if (!category) {
                return res.status(404).json({ message: 'Categoría no encontrada.' });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener la categoría.' });
        }
    }

    async updateCategory(req, res) {
        try {
            const { name } = req.body;
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
            if (!updatedCategory) {
                return res.status(404).json({ message: 'Categoría no encontrada.' });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al actualizar la categoría.' });
        }
    }

    async deleteCategory(req, res) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Categoría no encontrada.' });
            }
            res.status(200).json({ message: 'Categoría eliminada exitosamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al eliminar la categoría.' });
        }
    }
}

export default new CategoriesController();