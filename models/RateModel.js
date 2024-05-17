import mongoose from 'mongoose';

const { Schema } = mongoose;

const rateSchema = new Schema({
  rate: { type: String, required: true },
  price:{ type: Number}
});

const RateModel = mongoose.model('breakfastprice', rateSchema);

export default RateModel;
