/** 환경설정 객체의 인터페이스. */
export interface IProcessEnv {
  MODE: string;

  HOST: string;
  PORT: string;

  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;

  SECRET: string;
  EXPIREIN: string;

  [key: string]: string;
}
