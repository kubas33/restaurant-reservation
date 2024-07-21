import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { restaurantController } from 'controllers/restaurant/restaurant.controller';
import { createValidation, updateValidation } from 'validations/schemas/restaurant.schema';

const router = express.Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.post(
  '/create',
  createValidation,
  validate,
  restaurantController.create,
);

router.put(
  '/update/:id',
  updateValidation,
  validate,
  restaurantController.update,
);

router.delete(
  '/remove/:id',
  restaurantController.remove,
);


export default router