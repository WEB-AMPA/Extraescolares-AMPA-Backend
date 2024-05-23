import mongoose from 'mongoose';
import Category from './models/CategoriesModel.js'; // Asegúrate de que la ruta sea correcta

const addCategories = async () => {
    const categories = [
        'Chupetines',
        'Prebenjamín A',
        'Prebenjamín B',
        'Benjamín A',
        'Benjamín B',
        'Benjamín C',
        'Alevín A',
        'Alevín B',
        'Infantil',
        'Primaria',
        'Sin Categoría',
        'Familiar'
    ];

    for (const name of categories) {
        const category = new Category({ name });
        await category.save();
        console.log('Categoría agregada:', name);
    }
};

mongoose.connect('mongodb+srv://db_ciudadangeles:dqoHwcXsbXlY1jFy@actividadesextraescolar.xcbrlxt.mongodb.net/extracurriculars?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
        addCategories().then(() => mongoose.disconnect());
    })
    .catch(err => console.error('Error de conexión a MongoDB:', err));