import { Response } from "express";

export default class ResponseManager {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  json(statusCode: number, statusMessage: string, jsonData = {}) {
    this.res.statusCode = statusCode;
    this.res.statusMessage = statusMessage;
    this.res.send(jsonData);
  }
}
