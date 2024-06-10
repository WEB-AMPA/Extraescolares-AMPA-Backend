import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    monitor: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true }],
    scheduleDay: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule_days', required: true }],
    scheduleHour: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule_hours', required: true }],
    centers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'centers', required: true }],
    assignments: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'students' },
        studentName: { type: String, required: true },
        studentLastname: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
        scheduleDay: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule_days' },
        scheduleHour: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule_hours' },
        center: { type: mongoose.Schema.Types.ObjectId, ref: 'centers' }
    }]
});

const ActivitiesModel = mongoose.model('activities', activitySchema);

export default ActivitiesModel;

