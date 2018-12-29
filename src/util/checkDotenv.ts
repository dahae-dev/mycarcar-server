export default () => {
  if (process.env.MODE === undefined) {
    throw new Error("[-] .env file에 MODE가 작성되지 않았습니다.");
  }

  if (process.env.HOST === undefined) {
    throw new Error("[-] .env file에 HOST가 작성되지 않았습니다.");
  }

  if (process.env.PORT === undefined) {
    throw new Error("[-] .env file에 PORT가 작성되지 않았습니다.");
  }

  if (process.env.DB_HOST === undefined) {
    throw new Error("[-] .env file에 DB_HOST 작성되지 않았습니다.");
  }

  if (process.env.DB_USER === undefined) {
    throw new Error("[-] .env file에 DB_USER가 작성되지 않았습니다.");
  }

  if (process.env.DB_PASSWORD === undefined) {
    throw new Error("[-] .env file에 DB_PASSWORD가 작성되지 않았습니다.");
  }

  if (process.env.SECRET === undefined) {
    throw new Error("[-] .env file에 SECRET이 작성되지 않았습니다.");
  }

  if (process.env.EXPIREIN === undefined) {
    throw new Error("[-] .env file에 EXPIREIN이 작성되지 않았습니다.");
  }
};
