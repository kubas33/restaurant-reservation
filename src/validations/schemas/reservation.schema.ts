import { body } from 'express-validator';

export const reservationCreateValidation = [
	body('startTime').isISO8601().toDate().withMessage('Start time must be a valid date').notEmpty().withMessage('Start time is required'),
	body('endTime').isISO8601().toDate().withMessage('Start time must be a valid date').notEmpty().withMessage('Start time is required'),
	body('numberOfGuests').isInt({ min: 1 }).withMessage('Number of guests must be a positive integer').notEmpty().withMessage('Number of guests is required'),
	body('specialRequests').optional().isLength({ min: 3, max: 255 }).withMessage('Special requests must be between 3 and 100 characters'),
	body('reservationId').isInt({ min: 1 }).withMessage('reservation ID must be a positive integer').notEmpty().withMessage('reservation ID is required'),
	body('userId').isInt({ min: 1 }).withMessage('Restaurant ID must be a positive integer').notEmpty().withMessage('Restaurant ID is required'),
];

export const reservationUpdateValidation = [
	body('startTime').optional().isISO8601().toDate().withMessage('Start time must be a valid date'),
	body('endTime').optional().isISO8601().toDate().withMessage('Start time must be a valid date'),
	body('numberOfGuests').optional().isInt({ min: 1 }).withMessage('Number of guests must be a positive integer'),
	body('specialRequests').optional().isLength({ min: 3, max: 255 }).withMessage('Special requests must be between 3 and 100 characters'),
	body('reservationId').optional().isInt({ min: 1 }).withMessage('reservation ID must be a positive integer'),
	body('userId').optional().isInt({ min: 1 }).withMessage('Restaurant ID must be a positive integer'),
];