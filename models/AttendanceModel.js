import mongoose from 'mongoose';

const { Schema } = mongoose;

// Definir el esquema de la asistencia
const attendanceSchema = new Schema({
  date: { type: Date, required: true },
  attendance: { type: Number, required: true },
  activities_student: { type: Schema.Types.ObjectId, ref: 'activities_students', required: true } // Referencia al ID del estudiante en la tabla de estudiantes
});

// Crear el modelo de asistencia
const AttendanceModel = mongoose.model('activities_attendances', attendanceSchema);

export default AttendanceModel;
