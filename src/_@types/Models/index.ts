import { ISelectFromDB } from "./User";

/** 모델에서 DB에 쿼리문을 날리기 위한 함수의 타입 */
export type SendQuery = (query: string) => Promise<ISelectFromDB>;
