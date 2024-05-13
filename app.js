import './database/db.js';
import express from 'express';
import dotenv from 'dotenv';
import activitiesRouter from './routes/ActivitiesRoutes.js'; 
dotenv.config();

const app = express();

// Middleware para procesar datos JSON
app.use(express.json());

// Rutas
app.use('/api/activities', activitiesRouter); 

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});