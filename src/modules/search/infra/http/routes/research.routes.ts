import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ResearchesController from '../controllers/ResearchesController';
import ProductSearchController from '../controllers/ProductSearchController';

const researchesRouter = Router();
const researchesController = new ResearchesController();
const productSearchController = new ProductSearchController();

researchesRouter.use(ensureAuthentication);
researchesRouter.post(
  '/create',
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
researchesRouter.get('/:research_id', productSearchController.index);

export default researchesRouter;
