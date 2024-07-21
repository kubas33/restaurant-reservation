import { body } from 'express-validator';

export const tableCreateValidation = [
	body('name').isLength({ min: 3, max: 20 })
		.withMessage('Name must be between 3 and 20 characters').notEmpty().withMessage('Name is required'),
	body('seats').isInt({ min: 1 }).withMessage('Seats must be a positive integer').notEmpty().withMessage('Number of seats is required'),
	body('restaurantId').isInt({ min: 1 }).withMessage('Restaurant ID must be a positive integer').notEmpty().withMessage('Restaurant ID is required'),
];

export const tableUpdateValidation = [
	body('name').optional()
		.isLength({ min: 3, max: 20 }).withMessage('Name must be between 3 and 20 characters'),
	body('seats').optional()
		.isInt({ min: 1 }).withMessage('Seats must be a positive integer'),
];