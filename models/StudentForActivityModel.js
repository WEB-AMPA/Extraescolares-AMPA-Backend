// models/StudentForActivityModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentForActivitySchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'students', required: true },
  activity: { type: Schema.Types.ObjectId, ref: 'activities', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  scheduleDay: { type: Schema.Types.ObjectId, ref: 'schedule_days', required: true },
  scheduleHour: { type: Schema.Types.ObjectId, ref: 'schedule_hours', required: true },
  center: { type: Schema.Types.ObjectId, ref: 'centers', required: true },
});

const StudentForActivityModel = mongoose.model('studentForActivity', studentForActivitySchema);

export default StudentForActivityModel;
