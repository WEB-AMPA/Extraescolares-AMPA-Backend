import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  activity: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
});

const Activity = mongoose.model('activities', activitySchema);

export default Activity;