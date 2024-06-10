import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'roles', required: true },
  lastname: { type: String, required: true },
  name: { type: String, required: true },
  phone_number: {
    type: String,
    validate: {
      validator: function (v) {
        return this.role === 'partner' ? v && v.length > 0 : true;
      },
      message: props => `Phone number is required for partners`
    }
  },
  partner_number: {
    type: Number,
    unique: true,
    validate: {
      validator: function (v) {
        return this.role === 'partner' ? v != null : true;
      },
      message: props => `Partner number is required for partners`
    }
  },
  student_id: [{ type: Schema.Types.ObjectId, ref: 'students' }]
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;

