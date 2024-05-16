import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    center_id: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const Category = mongoose.model('categories', categorySchema);

export default Category;