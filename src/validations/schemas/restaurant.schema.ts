import { body } from 'express-validator';

export const restaurantCreateValidation = [
	body('name').isLength({ min: 3, max: 100 })
		.withMessage('Name must be between 3 and 100 characters').notEmpty().withMessage('Name is required'),
	body('address').optional()
		.isLength({ min: 3, max: 100 }).withMessage('Address must be between 3 and 100 characters'),
	body('phone').optional()
		.isLength({ min: 3, max: 20 }).withMessage('Phone must be between 3 and 20 characters'),
	body('cuisine').optional()
		.isLength({ min: 3, max: 100 }).withMessage('Cuisine must be between 3 and 100 characters'),
	body('description').optional()
		.isLength({ min: 3, max: 255 }).withMessage('Description must be between 3 and 255 characters'),
];

export const restaurantUpdateValidation = [
	body('name').optional()
		.isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
	body('address').optional()
		.isLength({ min: 3, max: 100 }).withMessage('Address must be between 3 and 100 characters'),
	body('phone').optional()
		.isLength({ min: 3, max: 20 }).withMessage('Phone must be between 3 and 20 characters'),
	body('cuisine').optional()
		.isLength({ min: 3, max: 100 }).withMessage('Cuisine must be between 3 and 100 characters'),
	body('description').optional()
		.isLength({ min: 3, max: 255 }).withMessage('Description must be between 3 and 255 characters'),
];