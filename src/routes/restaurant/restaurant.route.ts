import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { restaurantController } from 'controllers/restaurant/restaurant.controller';
import { restaurantCreateValidation, restaurantUpdateValidation } from 'validations/schemas/restaurant.schema';
import { tableController } from 'controllers/restaurant/table.controller';
import { tableCreateValidation, tableUpdateValidation } from 'validations/schemas/table.schema';
import { reservationCreateValidation, reservationUpdateValidation } from 'validations/schemas/reservation.schema';
import { reservationController } from 'controllers/restaurant/reservation.controller';

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

router.post(
	'/:restaurantId/table/:tableId/reservation/create',
	reservationCreateValidation,
	validate,
	reservationController.create,
);

router.put(
	'/:restaurantId/table/:tableId/reservation/update/:id',
	reservationUpdateValidation,
	validate,
	reservationController.update,
);

router.delete(
	'/:restaurantId/table/:tableId/reservation/remove/:id',
	reservationController.remove,
);

export default router