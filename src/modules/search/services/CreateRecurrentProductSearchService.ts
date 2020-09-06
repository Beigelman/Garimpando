import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IResearchesRepository from '../repositories/IResearchesRepository';
import ISearchProductParamsDTO from '../dtos/ISearchProductParamsDTO';
import IResearcherProvider from '../providers/ResearcherProvider/models/IResearcherProvider';
import Result from '../infra/typeorm/entities/Result';
import IResultsRepository from '../repositories/IResultsRepository';

interface IRequest {
  user_id: string;
  params: ISearchProductParamsDTO;
  frequency: number;
}

@injectable()
class CreateRecurrentSearchService {
  constructor(
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository,
    @inject('ResearcherProvider')
    private researcherProvider: IResearcherProvider,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  public async execute({
    user_id,
    params,
    frequency,
  }: IRequest): Promise<Result[]> {
    const researchRecorded = await this.researchesRepository.findByParams(
      JSON.stringify(params)
    );

    if (researchRecorded) {
      throw new AppError('Research already recorded in database');
    }

    const productsFound = await this.researcherProvider.findProduct(params);

    if (!productsFound || productsFound.length === 0) {
      throw new AppError('No products found');
    }

    const research = await this.researchesRepository.create({
      user_id,
      params: JSON.stringify(params),
      frequency,
    });

    const results = await this.resultsRepository.create({
      research_id: research.id,
      results: productsFound,
    });

    return results;
  }
}

export default CreateRecurrentSearchService;
