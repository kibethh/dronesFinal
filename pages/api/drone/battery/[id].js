import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/errors";

import { checkBattery } from "../../../../controllers/droneController";
const handler = nc({ onError });
dbConnect();

handler.get(checkBattery);

export default handler;
