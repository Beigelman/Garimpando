import { Router } from 'express';

import ProductSearchController from '@modules/search/infra/http/controllers/ProductSearchController';

const productSearchRouter = Router();
const productSearchController = new ProductSearchController();

productSearchRouter.get('/search/:research_id', productSearchController.index);

export default productSearchRouter;
