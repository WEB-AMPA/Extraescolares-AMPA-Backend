import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
    scheduleDay: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule_days', required: true }],
    scheduleHour: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule_hours', required: true }],
    centers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'centers', required: true }]
});

const ActivitiesModel = mongoose.model('activities', activitySchema);

export default ActivitiesModel;