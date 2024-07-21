import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { restaurantController } from 'controllers/restaurant/restaurant.controller';
import { restaurantCreateValidation, restaurantUpdateValidation } from 'validations/schemas/restaurant.schema';
import { tableController } from 'controllers/restaurant/table.controller';
import { tableCreateValidation, tableUpdateValidation } from 'validations/schemas/table.schema';

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
  restaurantCreateValidation,
  validate,
  restaurantController.create,
);

router.put(
  '/update/:id',
  restaurantUpdateValidation,
  validate,
  restaurantController.update,
);

router.delete(
  '/remove/:id',
  restaurantController.remove,
);

router.post(
	'/:restaurantId/table/create',
	tableCreateValidation,
	validate,
	tableController.create,
);

router.put(
	'/:restaurantId/table/update/:id',
	tableUpdateValidation,
	validate,
	tableController.create,
);

router.delete(
	'/:restaurantId/table/remove/:id',
	tableController.remove,
);
export default router