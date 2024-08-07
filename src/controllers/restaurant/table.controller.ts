import httpStatusCodes from 'http-status-codes';
import ApiResponse from 'utilities/api-response.utility';
import constants from 'constants';
import { ICreateTable, IUpdateTable } from 'interfaces/table.interface';
import { tableService } from 'services/restaurant/table.service';
import IControllerInterface from 'interfaces/IController.interface';
import { IDeleteById, IDetailById } from 'interfaces/common.interface';

const create: IControllerInterface = async (req, res) => {
	try {
		const params: ICreateTable = {
			name: req.body.name,
			seats: parseInt(req.body.seats, 10),
			restaurantId: parseInt(req.params.restaurantId, 10),
		}
		const table = await tableService.create(params);
		return ApiResponse.result(res, table, httpStatusCodes.CREATED);
	} catch (e) {
		if (e.code === constants.ERROR_CODE.DUPLICATED) {
			return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Table already exists.');
		}
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
	}
};

const update: IControllerInterface = async (req, res) => {
	try {
		const params: IUpdateTable = {
			id: parseInt(req.params.id, 10),
			name: req.body.name,
			seats: parseInt(req.body.seats, 10),
			restaurantId: parseInt(req.params.restaurantId, 10),
		}
		const table = await tableService.update(params);
		return ApiResponse.result(res, table, httpStatusCodes.OK);
	} catch (e) {
		if (e.code === constants.ERROR_CODE.DUPLICATED) {
			return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Table already exists.');
		}
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
	}
};

const remove: IControllerInterface = async (req, res) => {
	try {
		const params: IDeleteById = {
			id: parseInt(req.params.id, 10),
		}
		const table = await tableService.remove(params);
		return ApiResponse.result(res, table, httpStatusCodes.OK);
	} catch (e) {
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
	}
}

const getById: IControllerInterface = async (req, res) => {
	try {
		const params: IDetailById = {
			id: parseInt(req.params.id, 10),
		}
		const table = await tableService.getById(params);
		return ApiResponse.result(res, table, httpStatusCodes.OK);
	} catch (e) {
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
	}
}
export const tableController = {
	create,
	update,
	remove,
	getById
}