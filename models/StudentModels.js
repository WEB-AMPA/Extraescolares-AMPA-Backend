import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  breakfast: { type: String, required: true },
  observations: { type: String },
  partner_id: { type: Schema.Types.ObjectId, ref: 'partners' } 
});

const StudentModel = mongoose.model('students', studentSchema);

export default StudentModel;
