import mongoose from 'mongoose';

const scheduleHourSchema = new mongoose.Schema({
    range: { type: String, required: true }
});

const ScheduleHoursModel = mongoose.model('schedule_hours', scheduleHourSchema);

export default ScheduleHoursModel;