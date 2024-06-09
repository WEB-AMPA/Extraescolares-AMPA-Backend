import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: Schema.Types.ObjectId, ref: 'roles', required: true },
  name: { type: String, required: true }
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
