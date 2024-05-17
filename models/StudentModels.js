import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  observations: { type: String },
  activities: [{ type: Schema.Types.ObjectId, ref: 'activities' }],
  partner_id: { type: Schema.Types.ObjectId, ref: 'partners' } 
});

const StudentModel = mongoose.model('students', studentSchema);

export default StudentModel;
