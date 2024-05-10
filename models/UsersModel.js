import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    role: { type: String },
    lastname: { type: String },
    name: { type: String }
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
