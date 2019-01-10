import { Response } from "express";

export default class ResponseManager {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  public json(statusCode: number, statusMessage: string, jsonData = {}) {
    if (statusCode >= 200 && statusCode < 300) {
      this.res.json({ statusCode, statusMessage, ...jsonData });
      return;
    }
    this.res.statusCode = statusCode;
    this.res.statusMessage = statusMessage;
    this.res.send(jsonData);
  }
}
