import { Schema, model } from "mongoose";

const centerSchema = new Schema({
  center: { type: String, required: true },
});

const Center = model("Center", centerSchema);

export default Center;
