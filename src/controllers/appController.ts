import path from "path";
import { Controller } from "../_@types/Controllers";

export const appEndPoint: Controller = (req, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
};
