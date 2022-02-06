import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";
import "../../../middlewares/periodicScheduler";
import { allDrones, newDrone } from "../../../controllers/droneController";

const handler = nc({ onError });
dbConnect();
handler.get(allDrones);
handler.post(newDrone);

export default handler;
