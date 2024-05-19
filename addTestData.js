// // addTestData.js
// import mongoose from 'mongoose';
// import Category from './models/CategoryModel.js';
// import Center from './models/CenterModel.js';

// const addTestData = async () => {
//     // Agregar categoría de prueba
//     const category = new Category({
//         name: 'Prebenjamin A',
//         center_id: new mongoose.Types.ObjectId() // Puedes ajustar este ID según sea necesario
//     });
//     await category.save();
//     console.log('Categoría agregada:', category);

//     // Agregar centro de prueba
//     const center = new Center({
//         center: 'CEIP Ciudad de los Ángeles'
//     });
//     await center.save();
//     console.log('Centro agregado:', center);
// };

// mongoose.connect('mongodb+srv://db_ciudadangeles:dqoHwcXsbXlY1jFy@actividadesextraescolar.xcbrlxt.mongodb.net/extracurriculars?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Conexión exitosa a MongoDB');
//         addTestData().then(() => mongoose.disconnect());
//     })
//     .catch(err => console.error('Error de conexión a MongoDB:', err));
