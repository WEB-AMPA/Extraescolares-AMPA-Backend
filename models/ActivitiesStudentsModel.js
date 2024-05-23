import mongoose from 'mongoose';

const activitiesStudentsSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: 'activities', required: true },
  assignmentDate: { type: Date, default: Date.now }
});

const ActivitiesStudentsModel = mongoose.model('activities_students', activitiesStudentsSchema);

export default ActivitiesStudentsModel;