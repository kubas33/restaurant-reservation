import express, { NextFunction, Request, Response } from 'express';
// Controller
import userController from '../../controllers/user/user.controller';

// Schema
import { updateMeValidation } from 'validations/schemas/user.schema';
import { validationResult } from 'express-validator';

const router = express.Router();

// Middleware do obsługi błędów walidacji
const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.get(
  '/',
  userController.me,
);

router.put(
  '/',
  updateMeValidation,
  validate,
  userController.updateMe,
);

export default router;
