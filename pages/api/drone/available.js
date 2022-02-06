import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";
import { availableDrones } from "../../../controllers/droneController";

const handler = nc({ onError });
dbConnect();
handler.get(availableDrones);

export default handler;
