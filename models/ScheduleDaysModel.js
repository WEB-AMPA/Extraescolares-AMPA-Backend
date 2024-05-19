import mongoose from 'mongoose';

const scheduleDaySchema = new mongoose.Schema({
    days: { type: String, required: true }
});

const ScheduleDaysModel = mongoose.model('schedule_days', scheduleDaySchema);

export default ScheduleDaysModel;