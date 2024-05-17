import mongoose from 'mongoose';

const { Schema } = mongoose;

// Definir el esquema de la asistencia
const attendanceSchema = new Schema({
  date: { type: Date, required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'students', required: true }, // Referencia al ID del estudiante en la tabla de estudiantes
  monitor: { type: String, required: true },
  attendance: { type: String, required: true }
});

// Crear el modelo de asistencia
const AttendanceModel = mongoose.model('activities_attendances', attendanceSchema);

export default AttendanceModel;
