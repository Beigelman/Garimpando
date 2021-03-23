import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SearchForProductService from '@modules/search/services/SearchForProductService';

export default class ProductSearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { research_id } = request.params;

    const searchForProduct = container.resolve(SearchForProductService);

    const searchResult = await searchForProduct.execute({ research_id });

    return response.status(200).json(searchResult);
  }
}
