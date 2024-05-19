import "./database/db.js";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import partnerRoutes from "./routes/PartnerRoutes.js";
import loginRoutes from "./routes/LoginRoutes.js";
import categoriesRoutes from "./routes/CategoriesRoutes.js"; // Asegúrate de que esta línea está presente
import centerRoutes from "./routes/CenterRoutes.js";
import studentsRoutes from "./routes/StudentsRoutes.js";
import activitiesRouter from "./routes/ActivitiesRoutes.js";
import ScheduleDaysModel from "./models/ScheduleDaysModel.js";
import ScheduleHoursModel from "./models/ScheduleHoursModel.js";
import scheduleDaysRouter from "./routes/ScheduleDaysRoutes.js";
import scheduleHoursRouter from "./routes/ScheduleHoursRoutes.js";

import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

// Registrar el modelo ScheduleDaysModel y ScheduleHoursModel
mongoose.model("schedule_days", ScheduleDaysModel.schema);
mongoose.model("schedule_hours", ScheduleHoursModel.schema);

app.use("/", userRoutes);
app.use("/", partnerRoutes);
app.use("/", loginRoutes);
app.use("/", studentsRoutes);
app.use("/api/categories", categoriesRoutes);  // Asegúrate de que esta línea está presente
app.use('/api', centerRoutes);
app.use("/api/activities", activitiesRouter);
app.use("/api/scheduleDays", scheduleDaysRouter);
app.use("/api/scheduleHours", scheduleHoursRouter);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
