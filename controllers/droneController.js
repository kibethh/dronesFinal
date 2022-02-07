import Drones from "../models/drone";
import Medication from "../models/medication";
import catchAsync from "../middlewares/catchAsyncErrors";

// Get all drnes
const allDrones = catchAsync(async (req, res) => {
  const dronesCount = await Drones.countDocuments();
  const drones = await Drones.find();

  res.status(200).json({
    success: true,
    dronesCount,
    drones,
  });
});

// create new drone /api/drones
const newDrone = catchAsync(async (req, res) => {
  const drone = await Drones.create(req.body);
  res.status(201).json({
    success: true,
    drone,
  });
});

// load a drone
const loadDrone = catchAsync(async (req, res) => {
  const droneId = req.query.droneId;
  // Checking Battery Level
  const drone = await Drones.findById({ _id: droneId });
  if (drone) {
    const { batteryCapacity } = drone;
    if (batteryCapacity < 25) {
      res.status(400).json({
        success: "false",
        message: "Cannot Load,Your Battery is below 25%",
      });
    }
    const medication = req.body;
    // adding the drone property to the new object
    medication.drone = droneId;

    // finding all loads for a drone
    const droneLoads = await Medication.find({ drone: droneId });

    // droneLoads.reduce((a, b) => a + b, 0);
    let totalWeight = 0;
    // droneLoads.forEach((drone)=>{const totalWeight += drone.weight )
    droneLoads.forEach((drone) => {
      totalWeight += drone["weight"];
    });

    if (totalWeight + req.body.weight > 500) {
      return res.status(400).json({
        success: false,
        message:
          "That's an overweight on the drone, reduce the weight and try again!",
      });
    }
    console.log(medication);
    const load = await Medication.create(medication);

    return res.status(200).json({
      success: true,
      totalWeight,
      load,
    });
  }
  res.status(200).json({
    success: false,
    message: "No such drone",
  });
});

// medicationItems of a given drone
const droneItems = catchAsync(async (req, res) => {
  // regular expression to match alphanumeric characters - /^([a-zA-Z0-9 _-]+)$/
  const medicationItems = await Medication.find({
    drone: req.query.id,
  });
  res.status(200).json({
    success: true,
    medicationItems,
  });
});

// medicationItems of a given drone
const availableDrones = catchAsync(async (req, res) => {
  const allDrones = await Drones.find();

  let availableDrones = [];
  // adding all drones to an array
  allDrones.forEach((drone) => {
    availableDrones.push(drone);
  });
  // Already Loaded drones
  const loadedDrones = await Medication.aggregate([
    {
      $group: {
        _id: `$_id`,
        totalWeight: { $sum: "$weight" },
      },
    },
  ]);
  // console.log(loadedDrones);

  // reemoving fully loaded drones
  loadedDrones.forEach((dr) => {
    // console.log(i);
    if (dr["totalWeight"] >= 500) {
      availableDrones.pop(dr);
    }
  });

  res.status(200).json({
    success: true,
    availableDrones,
  });
});

// Battery Level
const checkBattery = catchAsync(async (req, res) => {
  console.log(req.query.id);
  const id = req.query.id;
  const drone = await Drones.findById({ _id: id });
  console.log(drone);
  const { batteryCapacity } = drone;
  res.status(200).json({
    success: true,
    batteryCapacity,
  });
});

export {
  allDrones,
  newDrone,
  loadDrone,
  droneItems,
  availableDrones,
  checkBattery,
};
