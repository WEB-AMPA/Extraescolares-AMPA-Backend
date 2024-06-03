import mongoose from 'mongoose';

const { Schema } = mongoose;

const breakfastSchema = new Schema({
<<<<<<< HEAD
  attendance: { type: Number,  required: true },
  date: { type: Date, required: true },
  fare: { type: String, required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'students' }, // Referencia al ID del estudiante en la tabla de estudiantes
=======
  date: { type: Date, required: true },
  partner_id: { type: Schema.Types.ObjectId, ref: 'partners', required: true }, // Referencia al ID del partner en la tabla de partners
  attendance: { type: Number, required: true }
>>>>>>> 81b052180ef2b3b47145bf9e5be7106c1082b186
});

// Crear el modelo adaptado
const BreakfastModel = mongoose.model('breakfasts', breakfastSchema);

export default BreakfastModel;
