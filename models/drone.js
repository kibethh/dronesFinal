import mongoose from "mongoose";

const dronesSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100,
  },
  model: {
    type: String,
    required: [true, "Please Enter a model type"],
    enum: {
      values: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
      message:
        'Please Select A Model From one of these ("Lightweight", "Middleweight", "Cruiserweight", "Heavyweight") ',
    },
  },
  weightLimit: {
    type: Number,
    required: true,
    max: 500,
  },
  batteryCapacity: {
    type: Number,
    required: true,
    max: 100,
  },
  state: {
    type: String,
    default: "IDLE",
    enum: ["IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING"],
  },
});

export default mongoose.models.Drones || mongoose.model("Drones", dronesSchema);
