import { getRepository, Repository } from 'typeorm';
import IResultsRepository from '@modules/search/repositories/IResultsRepository';
import ICreateResultDTO from '@modules/search/dtos/ICreateResultDTO';
import Result from '../entities/Result';

class ResultsRepository implements IResultsRepository {
  private ormRepository: Repository<Result>;

  constructor() {
    this.ormRepository = getRepository(Result);
  }

  public async create({
    research_id,
    results,
  }: ICreateResultDTO): Promise<Result[]> {
    const resultsData = results.map(result => ({
      research_id,
      ...result,
    }));

    const storeResults = this.ormRepository.create(resultsData);

    await this.ormRepository.save(storeResults);

    return storeResults;
  }

  public async findById(id: string): Promise<Result | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByResearchId(
    research_id: string
  ): Promise<Result[] | undefined> {
    const results = await this.ormRepository.find({
      where: { research_id },
    });

    return results;
  }
}

export default ResultsRepository;
