// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IResearcherProvider from '../providers/ResearcherProvider/models/IResearcherProvider';
import IResultDTO from '../dtos/IResultDTO';
import ISearchProductDTO from '../dtos/ISearchProductDTO';
import IResultsRepository from '../repositories/IResultsRepository';
import IResearchesRepository from '../repositories/IResearchesRepository';

@injectable()
class SearchForProductService {
  constructor(
    @inject('ResearcherProvider')
    private researcherProvider: IResearcherProvider,
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  public async execute({
    research_id,
  }: ISearchProductDTO): Promise<IResultDTO[]> {
    const research = await this.researchesRepository.findById(research_id);

    if (!research) {
      throw new AppError('Research not found');
    }

    const params = JSON.parse(research.params);

    const results_found = await this.researcherProvider.findProduct({
      ...params,
    });

    const old_results = await this.resultsRepository.findByResearchId(
      research_id
    );

    const new_results = results_found.filter(item =>
      old_results?.every(result => result.link !== item.link)
    );

    if (new_results.length === 0) {
      throw new AppError('No new Results were found');
    }

    await this.resultsRepository.create({
      research_id,
      results: new_results,
    });

    return new_results;
  }
}

export default SearchForProductService;
