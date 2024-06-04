import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  breakfast: { type: Boolean },
  observations: { type: String },
  course: { type: String, required: true },
  partner_id: { type: Number, required: true },
  center: { type: Schema.Types.ObjectId, ref: 'centers', required: true }, // Campo para el centro
  activities: [{
    activity: { type: Schema.Types.ObjectId, ref: 'activities' },
    category: { type: Schema.Types.ObjectId, ref: 'categories' },
    scheduleDay: { type: Schema.Types.ObjectId, ref: 'schedule_days' },
    scheduleHour: { type: Schema.Types.ObjectId, ref: 'schedule_hours' },
    center: { type: Schema.Types.ObjectId, ref: 'centers' }
  }]
});

const StudentModel = mongoose.model('students', studentSchema);

export default StudentModel;