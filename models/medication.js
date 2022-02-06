import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  weight: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    uppercase: true,
  },
  image: {
    type: String,
    default: "image_url",
  },
  drone: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Drones",
  },
});

export default mongoose.models.Medication ||
  mongoose.model("Medication", medicationSchema);
