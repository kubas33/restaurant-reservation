import { AppDataSource } from 'configs/app-data-source';
import { Table } from 'entities/restaurant/table.entity';
import ApiUtility from 'utilities/api.utility';
import DateTimeUtility from 'utilities/date-time.utility';
import { ICreateTable, IUpdateTable } from 'interfaces/table.interface';
import { StringError } from 'errors/string.error';
import { IDeleteById, IDetailById } from 'interfaces/common.interface';
import { Restaurant } from 'entities/restaurant/restaurant.entity';

const where = { isDeleted: false };


const create = async (params: ICreateTable) => {
	const restaurant = await AppDataSource.getRepository(Restaurant).findOne({
		where: { id: params.restaurantId }
	})

	if (restaurant) {
		const table: Table = AppDataSource.getRepository(Table).create({
			name: params.name,
			seats: params.seats,
			restaurant: restaurant,
			isDeleted: false,
			createdAt: DateTimeUtility.getCurrentTimeStamp(),
			updatedAt: DateTimeUtility.getCurrentTimeStamp(),
		})
		const tableData = await AppDataSource.getRepository(Table).save(table);
		return ApiUtility.sanitizeTable(tableData);
	} else {
		throw new StringError('Restaurant not found');
	}

};

const update = async (params: IUpdateTable) => {
	const query = { ...where, id: params.id };

	const table = await AppDataSource.getRepository(Table).findOne({
		where: query
	});
	if (!table) {
		throw new StringError('Table not found');
	}

	const tableData = await AppDataSource.getRepository(Table).update(query, {
		name : params.name ?? table.name,
		seats : params.seats ?? table.seats,
		updatedAt : DateTimeUtility.getCurrentTimeStamp()
	});

	if (tableData.affected === 0) {
		throw new StringError('Nothing changed');
	}

	const updatedTable = await AppDataSource.getRepository(Table).findOne({
		where: query
	});

	return ApiUtility.sanitizeTable(updatedTable);
};

const remove  = async (params: IDeleteById) => {
	const query = { ...where, id: params.id };
	const table = await AppDataSource.getRepository(Table).findOne({
		where: query
	});
	if (!table) {
		throw new StringError('Table not found');
	}

	return await AppDataSource.getRepository(Table).update(query, {
		isDeleted: true,
		deletedAt: DateTimeUtility.getCurrentTimeStamp()
	});
}

const getById = async (params: IDetailById) => {
	try {
		const data = await AppDataSource.getRepository(Table).findOne({
			where: { id: params.id }
		});
		return ApiUtility.sanitizeTable(data);
	} catch (e) {
		return null;
	}
};


export const tableService = {
	create,
	update,
	remove,
	getById
}