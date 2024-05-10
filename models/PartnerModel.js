import mongoose from 'mongoose';

const { Schema } = mongoose;

const partnerSchema = new Schema({
  partner_number: { type: Number, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' } // Referencia al ID del usuario en la tabla de usuarios
});

const PartnerModel = mongoose.model('partner', partnerSchema);

export default PartnerModel;
