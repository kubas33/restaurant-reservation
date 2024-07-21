import httpStatusCodes from 'http-status-codes';
import ApiResponse from 'utilities/api-response.utility';
import constants from 'constants';
import { ICreateRestaurant, IUpdateRestaurant } from 'interfaces/restaurant.interface';
import { restaurantService } from 'services/restaurant/restaurant.service';
import IController from 'interfaces/IController';
import { IDeleteById } from 'interfaces/common.interface';

const create: IController = async (req, res) => {
	try {
		const params: ICreateRestaurant = {
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			cuisine: req.body.cuisine,
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

const update: IController = async (req, res) => {
	try {
		const params: IUpdateRestaurant = {
			id: parseInt(req.params.id, 10),
			name: req.body.name,
			address: req.body.address,
			phone: req.body.phone,
			cuisine: req.body.cuisine,
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

const remove: IController = async (req, res) => {
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
export const restaurantController = {
	create,
	update,
	remove,
}