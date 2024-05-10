import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    username: { type: String },
    password: { type: String },
    email: { type: String },
    role: { type: String },
    lastname: { type: String },
    name: { type: String }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
