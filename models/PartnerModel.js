import mongoose from 'mongoose';

const { Schema } = mongoose;

const partnerSchema = new Schema({
  partner_number: { type: Number, required: true, unique: true },
  phone_number: { type: String, required: true },
  registration_date: { type: Date, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
  student_id: [{ type: Schema.Types.ObjectId, ref: 'students' }],
  breakfastprice_id: { type: Schema.Types.ObjectId, ref: 'breakfasts_rates' }
});

const PartnerModel = mongoose.model('partners', partnerSchema);

export default PartnerModel;