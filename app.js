import './database/db.js';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import activitiesRouter from './routes/ActivitiesRoutes.js';
import categoryRoutes from './routes/CategoriesRoutes.js';
import centerRoutes from './routes/CenterRoutes.js'
import studentsRoutes from './routes/StudentsRoutes.js'
import roleRoutes from './routes/RoleRoutes.js'
import activitiesStudentsRouter from "./routes/ActivitiesStudentsRoutes.js";
import rateRoutes from './routes/RateRoutes.js'
import ScheduleDaysModel from "./models/ScheduleDaysModel.js";
import ScheduleHoursModel from "./models/ScheduleHoursModel.js";
import scheduleDaysRouter from "./routes/ScheduleDaysRoutes.js";
import scheduleHoursRouter from "./routes/ScheduleHoursRoutes.js"
import attendanceRoutes from './routes/attendanceRoutes.js'
import breakfastRoutes from './routes/breakfastRoutes.js'
import cors from 'cors';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';


dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Registrar el modelo ScheduleDaysModel y ScheduleHoursModel
mongoose.model("schedule_days", ScheduleDaysModel.schema);
mongoose.model("schedule_hours", ScheduleHoursModel.schema);



app.use("/", userRoutes);
app.use('/api/partners', partnerRoutes);
app.use("/", loginRoutes);
app.use("/api/students", studentsRoutes); 
app.use("/api/categories", categoryRoutes);
app.use("/api", centerRoutes);
app.use("/api/activities", activitiesRouter);
app.use("/api/scheduleDays", scheduleDaysRouter);
app.use("/api/scheduleHours", scheduleHoursRouter);
app.use("/api/activitiesStudents", activitiesStudentsRouter);
app.use("/", breakfastRoutes);
app.use("/api", attendanceRoutes);
app.use('/rate', rateRoutes);
app.use('/', roleRoutes);

// Function to send email
function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
            <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Koding 101 Inc</p>
              <p>1600 Amphitheatre Parkway</p>
              <p>California</p>
            </div>
          </div>
        </div>
      `,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        return reject({ message: 'An error has occurred' });
      }
      return resolve({ message: 'Email sent successfully' });
    });
  });
}

// Routes for email recovery
app.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message));
});


// Puerto en el que se ejecutará el servidor
//const PORT = process.env.PORT ?? 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
