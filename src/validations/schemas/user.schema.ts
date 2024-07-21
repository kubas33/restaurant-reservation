import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
  body('password').isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 characters').notEmpty().withMessage('Password is required'),
  body('name').isLength({ min: 3, max: 100 }).withMessage('First name must be between 3 and 100 characters').notEmpty().withMessage('First name is required'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const updateMeValidation = [
  body('name').isLength({ min: 3, max: 100 }).withMessage('First name must be between 3 and 100 characters').notEmpty().withMessage('First name is required'),
];
