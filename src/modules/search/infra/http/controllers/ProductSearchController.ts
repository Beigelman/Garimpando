import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SearchForProductsService from '@modules/search/services/SearchForProductsService';

export default class ProductSearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { research_id } = request.params;

    const searchForProduct = container.resolve(SearchForProductsService);

    const searchResult = await searchForProduct.execute({ research_id });

    return response.status(200).json(searchResult);
  }
}
