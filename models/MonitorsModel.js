import mongoose from 'mongoose';

const { Schema } = mongoose;

const monitorSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    activities: [{ type: Schema.Types.ObjectId, ref: 'activities' }]
});

const MonitorsModel = mongoose.model('monitors', monitorSchema);

export default MonitorsModel;


