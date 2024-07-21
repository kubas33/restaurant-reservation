import { IBaseQueryParams } from 'interfaces/common.interface';

export interface ICreateTable {
	name: string;
	seats: number;
	restaurantId: number
}

export interface IUpdateTable {
	id: number;
	name: string | null;
	seats: number | null;
	restaurantId: number | null;
}

export interface ITableQueryParams extends IBaseQueryParams {
	keyword?: string;
}