import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    activity: { type: String, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
    centers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'centers' }]
});

const Activity = mongoose.model('activities', activitySchema);

export default Activity;