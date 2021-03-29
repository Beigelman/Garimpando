import FindResultsService from '@modules/search/services/FindResultsService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ResultsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { research_id } = request.params;
    const { id: user_id } = request.user;

    const findResultsService = container.resolve(FindResultsService);

    const searchResults = await findResultsService.execute({
      research_id,
      user_id,
    });

    return response.status(200).json(searchResults);
  }
}
