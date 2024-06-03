import "./database/db.js";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import loginRoutes from "./routes/LoginRoutes.js";
import categoriesRoutes from "./routes/CategoriesRoutes.js";
import centerRoutes from "./routes/CenterRoutes.js";
import studentsRoutes from "./routes/StudentsRoutes.js";
import activitiesRouter from "./routes/ActivitiesRoutes.js";
import ScheduleDaysModel from "./models/ScheduleDaysModel.js";
import ScheduleHoursModel from "./models/ScheduleHoursModel.js";
import scheduleDaysRouter from "./routes/ScheduleDaysRoutes.js";
import scheduleHoursRouter from "./routes/ScheduleHoursRoutes.js";
import activitiesStudentsRouter from "./routes/ActivitiesStudentsRoutes.js";
import attendanceRoutes from './routes/attendanceRoutes.js'
import breakfastRoutes from './routes/breakfastRoutes.js'
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Registrar el modelo ScheduleDaysModel y ScheduleHoursModel
mongoose.model("schedule_days", ScheduleDaysModel.schema);
mongoose.model("schedule_hours", ScheduleHoursModel.schema);

app.use("/", userRoutes);
app.use("/", partnerRoutes);
app.use("/", loginRoutes);
app.use("/api/students", studentsRoutes); 
app.use("/api/categories", categoriesRoutes);
app.use("/api", centerRoutes);
app.use("/api/activities", activitiesRouter);
app.use("/api/scheduleDays", scheduleDaysRouter);
app.use("/api/scheduleHours", scheduleHoursRouter);
app.use("/api/activitiesStudents", activitiesStudentsRouter);
app.use("/", breakfastRoutes);
app.use("/api", attendanceRoutes);
// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT ?? 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
