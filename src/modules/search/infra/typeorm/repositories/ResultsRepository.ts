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
    title,
    price,
    link,
  }: ICreateResultDTO): Promise<Result> {
    const result = this.ormRepository.create({
      research_id,
      title,
      price,
      link,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async findById(id: string): Promise<Result | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByUserId(user_id: string): Promise<Result[] | undefined> {
    const results = await this.ormRepository.find({
      where: { user_id },
    });

    return results;
  }
}

export default ResultsRepository;
