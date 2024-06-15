import './database/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import activitiesRouter from './routes/ActivitiesRoutes.js';
import categoryRoutes from './routes/CategoriesRoutes.js';
import centerRoutes from './routes/CenterRoutes.js';
import studentsRoutes from './routes/StudentsRoutes.js';
import roleRoutes from './routes/RoleRoutes.js';
import activitiesStudentsRouter from './routes/ActivitiesStudentsRoutes.js';
import scheduleDaysRouter from './routes/ScheduleDaysRoutes.js';
import scheduleHoursRouter from './routes/ScheduleHoursRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import breakfastRoutes from './routes/breakfastRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Rutas no protegidas
app.use('/api/auth', loginRoutes);

// Rutas protegidas
app.use('/api/users', userRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/activities', activitiesRouter);
app.use('/api/scheduleDays', scheduleDaysRouter);
app.use('/api/scheduleHours', scheduleHoursRouter);
app.use('/api/activitiesStudents', activitiesStudentsRouter);
app.use('/api/breakfast', breakfastRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/roles', roleRoutes);

// Manejador de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
