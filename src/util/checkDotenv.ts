/**
 * .env파일에서 환경변수를 추가할 때마다 해당 환경변수를 아래의
 * 배열안에 환경변수명을 넣어주어야합니다.
 */
const envList: string[] = [
  "MODE",
  "HOST",
  "PORT",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "SECRET",
  "EXPIREIN",
  "DB_DATABASE",
];

/** 환경변수 파일에서 필요한 속성이 없을 경우 에러를 발생시켜주는 함수입니다. */
export const checkDotenv = () => {
  for (const envKey of envList) {
    if (!(envKey in process.env)) {
      console.log("envKey :", envKey);
      throw new Error(`[-] .env file에 ${envKey}가 작성되지 않았습니다.`);
    }
  }
};
