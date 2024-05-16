import './database/db.js';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js';
import partnerRoutes from './routes/PartnerRoutes.js';
import loginRoutes from './routes/LoginRoutes.js';
import activitiesRouter from './routes/ActivitiesRoutes.js';
import categoryRoutes from './routes/CategoryRoutes.js';
import centerRoutes from './routes/CenterRoutes.js'
import studentsRoutes from './routes/StudentsRoutes.js'
dotenv.config();

const app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/', partnerRoutes);
app.use('/', loginRoutes);
app.use('/', studentsRoutes);
app.use('/api/activities', activitiesRouter);
app.use('/', categoryRoutes);
app.use('/', centerRoutes);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});