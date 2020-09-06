import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SearchForProductsService from '@modules/search/services/SearchForProductsService';

export default class ProductSearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      product_description,
      pages,
      min_price,
      max_price,
      platform,
    } = request.body;

    const searchForProduct = container.resolve(SearchForProductsService);

    const searchResult = await searchForProduct.execute({
      product_description,
      pages,
      platform,
      min_price,
      max_price,
    });

    return response.status(200).json(searchResult);
  }
}
