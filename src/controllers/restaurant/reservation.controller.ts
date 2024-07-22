import httpStatusCodes from 'http-status-codes';
import constants from "constants";
import IController from "interfaces/IController";
import { ICreateReservation } from "interfaces/reservation.interface";
import { reservationService } from "services/restaurant/reservation.service";
import ApiResponse from "utilities/api-response.utility";
import { IDeleteById } from 'interfaces/common.interface';

const create: IController = async (req, res) => {
    try {
        const params: ICreateReservation = {
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            numberOfGuests: parseInt(req.body.numberOfGuests, 10),
            specialRequests: req.body.specialRequests,
            tableId: parseInt(req.params.tableId, 10),
            userId: parseInt(req.params.userId, 10),
        }
        const reservation = await reservationService.create(params);
        return ApiResponse.result(res, reservation, httpStatusCodes.CREATED);
    } catch (e) {
        if (e.code === constants.ERROR_CODE.DUPLICATED) {
            return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Reservation already exists.');
        }
        return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    }
};

const update: IController = async (req, res) => {
    try {
        const params: ICreateReservation = {
            id: parseInt(req.params.id, 10),
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            numberOfGuests: parseInt(req.body.numberOfGuests, 10),
            specialRequests: req.body.specialRequests,
            tableId: parseInt(req.params.tableId, 10),
            userId: parseInt(req.params.userId, 10),
        }
        const reservation = await reservationService.update(params);
        return ApiResponse.result(res, reservation, httpStatusCodes.OK);
    } catch (e) {
        if (e.code === constants.ERROR_CODE.DUPLICATED) {
            return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Reservation already exists.');
        }
        return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    }
};  

const remove: IController = async (req, res) => {
    try {
        const params: IDeleteById = {    
            id: parseInt(req.params.id, 10),
        }
        const reservation = await reservationService.remove(params);
        return ApiResponse.result(res, reservation, httpStatusCodes.OK);
    } catch (e) {    
        return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    }
};

export const reservationController = {
    create,
    update,
    remove,
}