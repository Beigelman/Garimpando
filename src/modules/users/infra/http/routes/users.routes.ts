import uploadConfig from '@config/upload';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersControllers';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
