import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'roles', required: true },
  lastname: { type: String, required: true },
  name: { type: String, required: true },
  phone_number: { type: String },
  partner_number: { type: Number, unique: true },
  student_id: [{ type: Schema.Types.ObjectId, ref: 'students' }]
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;

