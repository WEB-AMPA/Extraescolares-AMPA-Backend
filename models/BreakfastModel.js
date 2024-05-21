import mongoose from 'mongoose';

const { Schema } = mongoose;

// Definir el esquema del desayuno
const breakfastSchema = new Schema({
  attendance: { type: Number,  required: true },
  date: { type: Date, required: true },
  fare: { type: String, required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'students' }, // Referencia al ID del estudiante en la tabla de estudiantes
});

// Crear el modelo de desayuno
const BreakfastModel = mongoose.model('breakfasts', breakfastSchema);

export default BreakfastModel;
