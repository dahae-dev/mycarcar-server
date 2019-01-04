const envList: string[] = [
  "MODE",
  "HOST",
  "PORT",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "SECRET",
  "EXPIREIN",
];

export const checkDotenv = () => {
  for (const envKey of envList) {
    if (!(envKey in process.env)) {
      console.log("envKey :", envKey);
      throw new Error(`[-] .env file에 ${envKey}가 작성되지 않았습니다.`);
    }
  }
};
