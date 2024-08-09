import { body } from 'express-validator';

export const tableCreateValidation = [
	body('name').isLength({ min: 1, max: 20 })
		.withMessage('Name must be between 1 and 20 characters').notEmpty().withMessage('Name is required'),
	body('seats').isInt({ min: 1 }).withMessage('Seats must be a positive integer').notEmpty().withMessage('Number of seats is required'),
];

export const tableUpdateValidation = [
	body('name').optional()
		.isLength({ min: 1, max: 20 }).withMessage('Name must be between 1 and 20 characters'),
	body('seats').optional()
		.isInt({ min: 1 }).withMessage('Seats must be a positive integer'),
];