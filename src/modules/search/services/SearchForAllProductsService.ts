import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IResearchesRepository from '@modules/search/repositories/IResearchesRepository';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import Research from '../infra/typeorm/entities/Research';

@injectable()
class SearchForAllProductsService {
  constructor(
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository,
    @inject('QueueProvider')
    private queueProvider: IQueueProvider
  ) {}

  public async execute(): Promise<Research[]> {
    const researches = await this.researchesRepository.findAll();

    if (!researches || researches.length === 0) {
      throw new AppError('No researches to be made');
    }

    researches.forEach(research => {
      this.queueProvider.add({
        name: 'FindProduct',
        data: { research_id: research.id },
      });
    });

    return researches;
  }
}

export default SearchForAllProductsService;
