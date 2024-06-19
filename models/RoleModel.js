import mongoose from 'mongoose';

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: { type: String, required: true }
});

const RoleModel = mongoose.model('roles', roleSchema);

export default RoleModel;
