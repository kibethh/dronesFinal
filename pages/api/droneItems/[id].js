import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";

import { droneItems } from "../../../controllers/droneController";
const handler = nc({ onError });
dbConnect();

handler.get(droneItems);

export default handler;
