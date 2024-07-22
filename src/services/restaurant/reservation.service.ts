import { AppDataSource } from 'configs/app-data-source';
import { Reservation } from 'entities/restaurant/reservation.entity';
import { StringError } from 'errors/string.error';
import { IDeleteById } from 'interfaces/common.interface';
import { ICreateReservation, IUpdateReservation } from 'interfaces/reservation.interface';
import ApiUtility from 'utilities/api.utility';
import DateTimeUtility from 'utilities/date-time.utility';
import { Table } from 'entities/restaurant/table.entity';
import { User } from 'entities/user/user.entity';
import { Between, LessThan, MoreThan } from 'typeorm';

const where = { isDeleted: false };

const create = async (params: ICreateReservation) => {
    const table = await AppDataSource.getRepository(Table).findOne({
        where: { id: params.tableId },
        relations: ['restaurant']
    })

    if (!table) {
        throw new StringError(`Table with id ${params.tableId} not found`);
    }

    const user = await AppDataSource.getRepository(User).findOne({
        where: { id: params.userId }
    })

    if (!user) {
        throw new StringError('User not found');
    }

    // Sprawdzenie kolizji rezerwacji
    const overlappingReservations = await AppDataSource.getRepository(Reservation).find({
        where: [
            {
                table: table,
                startTime: Between(params.startTime, params.endTime)
            },
            {
                table: table,
                endTime: Between(params.startTime, params.endTime)
            },
            {
                table: table,
                startTime: LessThan(params.startTime),
                endTime: MoreThan(params.endTime)
            }
        ]
    });

    if (overlappingReservations.length > 0) {
        throw new StringError('The table is already reserved for the given time range.');
    }

    const reservation = AppDataSource.getRepository(Reservation).create({
        startTime: params.startTime,
        endTime: params.endTime,
        numberOfGuests: params.numberOfGuests,
        specialRequests: params.specialRequests,
        table: table,
        user: user,
        createdAt: DateTimeUtility.getCurrentTimeStamp(),
        updatedAt: DateTimeUtility.getCurrentTimeStamp(),
    })
    const reservationData = await AppDataSource.getRepository(Reservation).save(reservation);
    return ApiUtility.sanitizeReservation(reservationData);
}

const update = async (params: IUpdateReservation) => {
    const query = { ...where, id: params.id };
    const reservation = await AppDataSource.getRepository(Reservation).findOne({
        where: query
    });

    if (!reservation) {
        throw new StringError('Reservation not found');
    };

    const reservationData = await AppDataSource.getRepository(Reservation).update(query, {
        startTime: params.startTime ?? reservation.startTime,
        endTime: params.endTime ?? reservation.endTime,
        numberOfGuests: params.numberOfGuests ?? reservation.numberOfGuests,
        specialRequests: params.specialRequests ?? reservation.specialRequests,
        updatedAt: DateTimeUtility.getCurrentTimeStamp()
    });     
    if (reservationData.affected === 0) {
        throw new StringError('Nothing changed');
    };
    const updatedReservation = await AppDataSource.getRepository(Reservation).findOne({
        where: query
    });
    return ApiUtility.sanitizeReservation(updatedReservation);
}

const remove = async (params: IDeleteById) => {
    const query = { ...where, id: params.id };
    const reservation = await AppDataSource.getRepository(Reservation).findOne({
        where: query
    });
    if (!reservation) {
        throw new StringError('Reservation not found');
    }
    const reservationData = await AppDataSource.getRepository(Reservation).update(query, {
        isDeleted: true
    });
    if (reservationData.affected === 0) {
        throw new StringError('Nothing changed');
    }
    return ApiUtility.sanitizeReservation(reservation);
}

export const reservationService = {
    create,
    update,
    remove
}