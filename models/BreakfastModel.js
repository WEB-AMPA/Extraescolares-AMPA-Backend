import mongoose from 'mongoose';

const { Schema } = mongoose;

const breakfastSchema = new Schema({
  date: { type: Date, required: true },
  partner_id: { type: Schema.Types.ObjectId, ref: 'partners', required: true }, // Referencia al ID del partner en la tabla de partners
  attendance: { type: Number, required: true }
});

// Crear el modelo adaptado
const BreakfastModel = mongoose.model('breakfasts', breakfastSchema);

export default BreakfastModel;
