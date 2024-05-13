// Importar el módulo db.js donde se establece la conexión a MongoDB
import './database/db.js';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/', partnerRoutes);
app.use('/', loginRoutes);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
