export default class MiddlewareOptions {
  public cors: {};

  constructor() {
    this.cors = {
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      exposedHeaders: "x-access-token",
    };
  }
}
