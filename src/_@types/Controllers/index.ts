import { Request, Response } from "express";

export interface IJwtParam {
  HOST: string;
  PORT: string;
  SECRET: string;
  EXPIREIN: string;
  [key: string]: string;
}

export interface IPayload {
  id: string;
  level: number;
}

export interface IAdminController {
  /**```md
  GET : /api/edit_account/company
  ```*/
  getUserCount: (req: Request, res: Response) => void;
  /**```md
  GET : /api/edit_account/company
  ```*/
  getUserList: (req: Request, res: Response) => void;
  /**```md
  UPDATE : /api/admin/user-list
  ```*/
  updateUser: (req: Request, res: Response) => void;
}

export interface IEditAccountContoller {
  /**```md
  PATCH : /api/edit_account/company
  ```*/
  patchCompanyUser: (req: Request, res: Response) => void;
  /**```md
  PATCH : /api/edit_account/user
  ```*/
  patchUserController: (req: Request, res: Response) => void;
  /**```md
  GET : /api/edit_account
  ```*/
  getUser: (req: Request, res: Response) => void;
}

export interface IEstimateController {
  /**```md
  GET : /api/estimate/:id
  ```*/
  getEstimate: (req: Request, res: Response) => void;
  /**```md
  GET : /api/estimate/list
  ```*/
  getEstimateList: (req: Request, res: Response) => void;
  /**```md
  POST : /api/estimate/
  ```*/
  postEstimate: (req: Request, res: Response) => void;
}

export interface ILoginController {
  /**```md
  POST : /api/estimate
  ```*/
  postUser: (req: Request, res: Response) => void;
}

export interface IRegisterController {
  /**```md
  POST : /api/register/user
  ```*/
  postNomalUser: (req: Request, res: Response) => void;
  /**```md
  POST : /api/register/company
  ```*/
  postCompanyUser: (req: Request, res: Response) => void;
}

export interface IRentalController {
  /**```md
  GET : /api/:type/:target
  ```*/
  getList: (req: Request, res: Response) => void;
  /**```md
  GET : /api/capital-profit
  ```*/
  getCapitalList: (req: Request, res: Response) => void;
}
