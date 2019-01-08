import { Response } from "express";

export default class ResponseManager {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  public json(statusCode: number, statusMessage: string, jsonData = {}) {
    this.res.status(statusCode).json({ statusCode, statusMessage, ...jsonData });
  }
}
