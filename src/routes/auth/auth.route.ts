import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// Controller
import userController from '../../controllers/user/user.controller';

// Schema
import { loginValidation, registerValidation } from 'validations/schemas/user.schema';


const router = express.Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.post(
  '/register',
  registerValidation,
  validate,
  userController.create,
);

router.post(
  '/login',
  loginValidation,
  validate,
  userController.login,
);

export default router;
