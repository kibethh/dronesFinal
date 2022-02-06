import schedule from "node-schedule";
import mongoose from "mongoose";
import Drones from "../models/drone";

// execute every 20seconds

const job = schedule.scheduleJob("*/20 * * * * *", async (req, res, next) => {
  await Drones.updateMany(
    {},
    {
      $mul: { batteryCapacity: parseFloat("0.9") },
    }
  );
  const droneBattery = await Drones.find({}).select("batteryCapacity");
  console.log("Battery levels are at: " + droneBattery);
  console.log("----x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x----");
  const dronesState = await Drones.find({});
  console.log(dronesState);
  dronesState.forEach(async (drone) => {
    if (drone.batteryCapacity < 25) {
      // updating state based on battery level
      await drone.updateOne({ $set: { state: "IDLE" } });
    }
  });
});

export default job;
