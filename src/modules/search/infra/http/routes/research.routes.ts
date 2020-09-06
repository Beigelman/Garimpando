import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ResearchesController from '../controllers/ResearchesController';

const researchesRouter = Router();
const researchesController = new ResearchesController();

researchesRouter.use(ensureAuthentication);
researchesRouter.post(
  '/product',
  celebrate({
    [Segments.BODY]: {
      params: Joi.object({
        product_description: Joi.string().required(),
        pages: Joi.number().required(),
        platform: Joi.object({
          olx: Joi.boolean().required(),
          ml: Joi.boolean().required(),
        }).required(),
        min_price: Joi.number(),
        max_price: Joi.number(),
      }).required(),
      frequency: Joi.number().required(),
    },
  }),
  researchesController.create
);

export default researchesRouter;
