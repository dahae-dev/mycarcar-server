import path from "path";
import { Controller } from "../_@types/Controllers";

/** 앱의 뷰를 요청을 위한 엔드포인트. */
export const appEndPoint: Controller = (req, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
};
