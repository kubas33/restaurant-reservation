import { IBaseQueryParams } from 'interfaces/common.interface';

export interface ICreateRestaurant {
	name: string;
	address: string | null;
	phone: string | null;
	cuisine: string | null;
	description: string | null;
}

export interface IUpdateRestaurant {
	id: number;
	name: string | null;
	address: string | null;
	phone: string | null;
	cuisine: string | null;
	description: string | null;
}


export interface IRestaurantQueryParams extends IBaseQueryParams {
	keyword?: string;
	limit: number;
	page: number;
}