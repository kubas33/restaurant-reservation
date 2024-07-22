import { body, param } from 'express-validator';

export const reservationCreateValidation = [
	body('startTime').isISO8601().toDate().withMessage('Start time must be a valid date').notEmpty().withMessage('Start time is required'),
	body('endTime').isISO8601().toDate().withMessage('Start time must be a valid date').notEmpty().withMessage('Start time is required'),
	body('numberOfGuests').isInt({ min: 1 }).withMessage('Number of guests must be a positive integer').notEmpty().withMessage('Number of guests is required'),
	body('specialRequests').optional().isLength({ min: 3, max: 255 }).withMessage('Special requests must be between 3 and 100 characters'),
	param('tableId').isInt({ min: 1 }).withMessage('Table ID must be a positive integer').notEmpty().withMessage('reservation ID is required'),
	body('userId').isInt({ min: 1 }).withMessage('Restaurant ID must be a positive integer').notEmpty().withMessage('Restaurant ID is required'),
];

export const reservationUpdateValidation = [
	param('reservationId').optional().isInt({ min: 1 }).withMessage('Reservation ID must be a positive integer'),
	body('startTime').optional().isISO8601().toDate().withMessage('Start time must be a valid date'),
	body('endTime').optional().isISO8601().toDate().withMessage('Start time must be a valid date'),
	body('numberOfGuests').optional().isInt({ min: 1 }).withMessage('Number of guests must be a positive integer'),
	body('specialRequests').optional().isLength({ min: 3, max: 255 }).withMessage('Special requests must be between 3 and 100 characters'),
	param('tableId').optional().isInt({ min: 1 }).withMessage('Table ID must be a positive integer'),
	body('userId').optional().isInt({ min: 1 }).withMessage('Restaurant ID must be a positive integer'),
];