import httpStatusCodes from 'http-status-codes';
import ApiResponse from 'utilities/api-response.utility';
import constants from 'constants';
import { ICreateRestaurant, IRestaurantQueryParams, IUpdateRestaurant } from 'interfaces/restaurant.interface';
import { restaurantService } from 'services/restaurant/restaurant.service';
import IControllerInterface from 'interfaces/IController.interface';
import { IDeleteById, IDetailById } from 'interfaces/common.interface';
import ApiUtility from 'utilities/api.utility';

const create: IControllerInterface = async (req, res) => {
	try {
		const params: ICreateRestaurant = {
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			cuisine: req.body.cuisine,
			description: req.body.description,
		}
		const restaurant = await restaurantService.create(params);
		return ApiResponse.result(res, restaurant, httpStatusCodes.CREATED);
	} catch (e) {
		if (e.code === constants.ERROR_CODE.DUPLICATED) {
			return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Restaurant already exists.');
		}
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
	}
};

const update: IControllerInterface = async (req, res) => {
	try {
		const params: IUpdateRestaurant = {
			id: parseInt(req.params.id, 10),
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			cuisine: req.body.cuisine,
			description: req.body.description,
		}
		const restaurant = await restaurantService.update(params);
		return ApiResponse.result(res, restaurant, httpStatusCodes.OK);
	} catch (e) {
		if (e.code === constants.ERROR_CODE.DUPLICATED) {
			return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Restaurant already exists.');
		}
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
	}
};

const remove: IControllerInterface = async (req, res) => {
	try {
		const params: IDeleteById = {
			id: parseInt(req.params.id, 10),
		}
		const restaurant = await restaurantService.remove(params);
		return ApiResponse.result(res, restaurant, httpStatusCodes.OK);
	} catch (e) {
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
	}
}

const list: IControllerInterface = async (req, res) => {
	try {
		const limit = ApiUtility.getQueryParam(req, 'limit');
		const page = ApiUtility.getQueryParam(req, 'page');
		const keyword = ApiUtility.getQueryParam(req, 'keyword');
		const params: IRestaurantQueryParams =
			{
				keyword,
				limit,
				page,
			};

		const restaurants = await restaurantService.list(params);
		return ApiResponse.result(res, restaurants, httpStatusCodes.OK);
	} catch (e) {
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
	}
}

const getById: IControllerInterface = async (req, res) => {
	try {
		const params: IDetailById = {
			id: parseInt(req.params.id, 10),
		}
		const restaurant = await restaurantService.getById(params.id);
		return ApiResponse.result(res, restaurant, httpStatusCodes.OK);
	} catch (e) {
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
	}
}

const getRestaurantTables: IControllerInterface = async (req, res) => {
	try {
		const params: IDetailById = {
			id: parseInt(req.params.id, 10),
		}
		const tables = await restaurantService.getRestaurantTables(params.id);
		return ApiResponse.result(res, tables, httpStatusCodes.OK);
	} catch (e) {
		return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
	}
}
export const restaurantController = {
	create,
	update,
	remove,
	list,
	getById,
	getRestaurantTables
}