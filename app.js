// Importar el módulo db.js donde se establece la conexión a MongoDB
import './database/db.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const app = express();



// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
