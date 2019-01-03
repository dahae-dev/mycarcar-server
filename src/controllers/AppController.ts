import { Request, Response } from "express";
import path from "path";

/**
 * 앱의 뷰를 요청을 위한 엔드포인트.
 */
export default (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
};
