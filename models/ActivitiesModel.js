import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    activity: { type: String, required: true },
    id_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    center_id: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;