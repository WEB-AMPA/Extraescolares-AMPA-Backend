import mongoose from 'mongoose';

const { Schema } = mongoose;

// Definir el esquema de la asistencia
const attendanceSchema = new Schema({
  date: { type: Date, required: true },
  attendance: { type: Number, required: true },
  activities_students: { type: Schema.Types.ObjectId, ref: 'students', required: true }
});

// Crear el modelo de asistencia
const AttendanceModel = mongoose.model('activities_attendances', attendanceSchema);

export default AttendanceModel;
