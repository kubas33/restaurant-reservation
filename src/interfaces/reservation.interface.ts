import { IBaseQueryParams } from 'interfaces/common.interface';

export interface ICreateReservation {
	startTime: Date;
	endTime: Date;
	numberOfGuests: number;
	specialRequests: string;
	tableId: number;
	userId: number
}

export interface IUpdateReservation {
	id: number;
	startTime: Date | null;
	endTime: Date | null;
	numberOfGuests: number | null;
	specialRequests: string | null;
	tableId: number | null;
	userId: number | null;
}

export interface IReservationQueryParams extends IBaseQueryParams {
	keyword?: string;
}