export interface IJwtParam {
  HOST: string;
  PORT: string;
  SECRET: string;
  EXPIREIN: string;
  [key: string]: string;
}

export interface IPayload {
  id: string;
}
