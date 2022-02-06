const drones = require("../data/drones");

const mongoose = require("mongoose");

const dronesSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    maxLength: 100,
  },
  model: {
    type: String,
    required: [true, "Please Enter a model type"],
    enum: {
      values: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
      message: "Please Select A Model",
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

const Drone = mongoose.model("Drone", dronesSchema);

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect("mongodb://127.0.0.1:27017/drones", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected"));
};

dbConnect();

const seedDrones = async () => {
  try {
    await Drone.deleteMany();
    console.log("Drones are deleted");
    await Drone.insertMany(drones);
    console.log("Drones are added are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedDrones();
