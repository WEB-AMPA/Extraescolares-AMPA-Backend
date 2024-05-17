import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    scheduleDay: { type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleDay', required: true },
    scheduleHour: { type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleHour', required: true }
});

const Activity = mongoose.model('activities', activitySchema);

export default Activity;