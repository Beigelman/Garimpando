import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IResearchesRepository from '@modules/search/repositories/IResearchesRepository';
import IResearcherProvider from '@modules/search/providers/ResearcherProvider/models/IResearcherProvider';
import IResultsRepository from '@modules/search/repositories/IResultsRepository';

@injectable()
class SearchForProductsRoutine {
  constructor(
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository,
    @inject('ResearcherProvider')
    private researcherProvider: IResearcherProvider,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  public async execute(): Promise<void> {
    const researches = await this.researchesRepository.findAll();

    if (!researches || researches.length === 0) {
      throw new AppError('No researches to be made');
    }

    researches.map(async research => {
      const results = await this.researcherProvider.findProduct({
        ...JSON.parse(research.params),
      });

      await this.resultsRepository.create({
        research_id: research.id,
        results,
      });
    });
  }
}

export default SearchForProductsRoutine;
