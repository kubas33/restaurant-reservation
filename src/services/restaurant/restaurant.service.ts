import { AppDataSource } from 'configs/app-data-source';
import { Restaurant } from 'entities/restaurant/restaurant.entity';
import ApiUtility from 'utilities/api.utility';
import DateTimeUtility from 'utilities/date-time.utility';
import { ICreateRestaurant, IRestaurantQueryParams, IUpdateRestaurant } from 'interfaces/restaurant.interface';
import { StringError } from 'errors/string.error';
import { IDeleteById } from 'interfaces/common.interface';

const where = { isDeleted: false };


const create = async (params: ICreateRestaurant) => {
	const restaurant = AppDataSource.getRepository(Restaurant).create({
		name: params.name,
		address: params.address??null,
		phone: params.phone??null,
		cuisine: params.cuisine??null,
		description: params.description??null,
		isDeleted: false,
		createdAt: DateTimeUtility.getCurrentTimeStamp(),
		updatedAt: DateTimeUtility.getCurrentTimeStamp(),
	})
	const restaurantData = await AppDataSource.getRepository(Restaurant).save(restaurant);
	return ApiUtility.sanitizeRestaurant(restaurantData);
};

const update = async (params: IUpdateRestaurant) => {
	const query = { ...where, id: params.id };

	const restaurant = await AppDataSource.getRepository(Restaurant).findOne({
		where: query
	});
	if (!restaurant) {
		throw new StringError('Restaurant not found');
	}

	const restaurantData = await AppDataSource.getRepository(Restaurant).update(query, {
		name : params.name ?? restaurant.name,
		address : params.address ?? restaurant.address,
		phone : params.phone ?? restaurant.phone,
		cuisine : params.cuisine ?? restaurant.cuisine,
		description : params.description ?? restaurant.description,
		updatedAt : DateTimeUtility.getCurrentTimeStamp()
	});

	if (restaurantData.affected === 0) {
		throw new StringError('Nothing changed');
	}

	const updatedRestaurant = await AppDataSource.getRepository(Restaurant).findOne({
		where: query
	});

	return ApiUtility.sanitizeRestaurant(updatedRestaurant);
};

const remove  = async (params: IDeleteById) => {
	const query = { ...where, id: params.id };
	const restaurant = await AppDataSource.getRepository(Restaurant).findOne({
		where: query
	});
	if (!restaurant) {
		throw new StringError('Restaurant not found');
	}

	return await AppDataSource.getRepository(Restaurant).update(query, {
		isDeleted: true,
		deletedAt: DateTimeUtility.getCurrentTimeStamp()
	});
}

const list = async (params: IRestaurantQueryParams) => {
	let restaurantRepo = AppDataSource.getRepository(Restaurant).createQueryBuilder('restaurant');
	restaurantRepo = restaurantRepo.where('restaurant.isDeleted = :isDeleted', { isDeleted: false });

	if (params.keyword) {
		restaurantRepo = restaurantRepo.andWhere('restaurant.name LIKE :name', { name: `%${params.keyword}%` });
	}

	// Pagination
	const paginationRepo = restaurantRepo;
	const total = await paginationRepo.getMany();
	const pagRes = ApiUtility.getPagination(total.length, params.limit, params.page);
	restaurantRepo = restaurantRepo.limit(params.limit).offset(ApiUtility.getOffset(params.limit, params.page));
	const totalPages = Math.ceil(total.length / params.limit);
	const restaurants = await restaurantRepo.getMany();

	const response = [];
	if (restaurants && restaurants.length) {
		for (const item of restaurants) {
			response.push(ApiUtility.sanitizeRestaurant(item));
		}
	}
	return { response, pagination: { ...pagRes.pagination, totalPages } };
}

const getById = async (id: number) => {
	const restaurant = await AppDataSource.getRepository(Restaurant).findOne({ where: { ...where, id } });
	if (!restaurant) {
		throw new StringError('Restaurant not found');
	}
	return ApiUtility.sanitizeRestaurant(restaurant);
}


export const restaurantService = {
	create,
	update,
	remove,
	list,
	getById
}