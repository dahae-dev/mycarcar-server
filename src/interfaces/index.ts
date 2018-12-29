interface IRowDataPacket {
  u_no: number;
  u_id: string;
  u_password: string;
  u_name: string;
  u_email: string;
  u_phone: string;
}

interface IRegisterInfo {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  [key: string]: string;
}

interface IUserInfomation {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  [key: string]: string;
}

interface IChangedRegisterInfo {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

interface ISelectKey {
  id: string;
}

interface ISignInInfomation {
  id: string;
  pw: string;
}

interface IDecodedToken {
  id: string;
  iat: number;
  exp: number;
  iss: string;
}

interface IProcessEnv {
  [key: string]: string;
}
