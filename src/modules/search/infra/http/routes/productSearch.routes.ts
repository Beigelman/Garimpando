import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductSearchController from '@modules/search/infra/http/controllers/ProductSearchController';

const productSearchRouter = Router();
const productSearchController = new ProductSearchController();

productSearchRouter.post(
  '/search',
  celebrate({
    [Segments.BODY]: {
      product_description: Joi.string().required(),
      pages: Joi.number().required(),
      min_price: Joi.number(),
      max_price: Joi.number(),
    },
  }),
  productSearchController.index
);

export default productSearchRouter;
