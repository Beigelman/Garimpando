import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateRecurrentSearchService from '@modules/search/services/CreateRecurrentProductSearchService';

export default class ResearchesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { params, frequency } = request.body;
    const { id } = request.user;

    const createRecurrentSearch = container.resolve(
      CreateRecurrentSearchService
    );

    await createRecurrentSearch.execute({
      user_id: id,
      params,
      frequency,
    });

    return response.status(201).send();
  }
}
