// Interfaces
import { IBaseQueryParams } from './common.interface';

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUpdateUser {
  id: number;
  name: string;
}

export interface IUserQueryParams extends IBaseQueryParams {
  keyword?: string;
}
