import mongoose from 'mongoose';

const centerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true }
});

const Center = mongoose.model('centers', centerSchema);

export default Center;