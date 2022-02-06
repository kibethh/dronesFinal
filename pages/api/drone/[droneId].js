import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";

import {
  loadDrone,
  droneItems,
  availableDrones,
} from "../../../controllers/droneController";
const handler = nc({ onError });
dbConnect();

handler.post(loadDrone);
handler.get(availableDrones);

export default handler;
