import express from 'express';
// Controller
import userController from '../../controllers/user/user.controller';

// Schema
// Middleware
import { isAdmin } from 'middlewares/permission-handler.middleware';
import { registerValidation } from 'validations/schemas/user.schema';

const router = express.Router();

router.get(
  '/',
  userController.list,
);

router.delete(
  '/:id',
  isAdmin(),
  userController.remove,
);

router.post(
  '/create',
  registerValidation,
  isAdmin(),
  userController.create,
);

router.put(
  '/update/:id',
  isAdmin(),
  userController.update,
);

router.get(
  '/:id',
  userController.detail,
);

export default router;
