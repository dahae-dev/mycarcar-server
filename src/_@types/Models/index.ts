import { Query } from "mysql";

export type SendQuery = (query: string) => Promise<Query>;
