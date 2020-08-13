import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SearchForProductsService from '@modules/productSearch/services/SearchForProductsService';

export default class ProductSearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { product_description, pages } = request.body;

    const searchForProduct = container.resolve(SearchForProductsService);

    const searchResult = await searchForProduct.execute({
      product_description,
      pages,
    });

    return response.status(204).json(searchResult);
  }
}
