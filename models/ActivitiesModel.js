import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    activity: { type: String, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    centers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Center' }]
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;