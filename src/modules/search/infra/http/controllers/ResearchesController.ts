import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateRecurrentSearchService from '@modules/search/services/CreateRecurrentProductSearchService';
import CancelResearchesServices from '@modules/search/services/CancelResearchesServices';
import FindUserResearchesService from '@modules/search/services/FindUserResearchesService';

export default class ResearchesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findUserResearches = container.resolve(FindUserResearchesService);

    const researches = await findUserResearches.execute({ user_id: id });

    return response.json(researches);
  }

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

    return response.status(201).send('Research created successfully');
  }

  public async cancel(request: Request, response: Response): Promise<Response> {
    const { research_id } = request.params;
    const { id } = request.user;

    const cancelResearch = container.resolve(CancelResearchesServices);

    await cancelResearch.execute({ research_id, user_id: id });

    return response.status(201).send('Research canceled successfully');
  }
}
