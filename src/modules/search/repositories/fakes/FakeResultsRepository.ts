import ICreateResultDTO from '@modules/search/dtos/ICreateResultDTO';
import Result from '@modules/search/infra/typeorm/entities/Result';
import { v4 as uuid } from 'uuid';
import IResultsRepository from '../IResultsRepository';

class FakeResultsRepository implements IResultsRepository {
  private results: Result[] = [];

  public async create({
    research_id,
    results,
  }: ICreateResultDTO): Promise<Result[]> {
    results.forEach(item => {
      const result = new Result();
      Object.assign(result, { id: uuid(), research_id }, item);
      this.results.push(result);
    });

    return this.results;
  }

  public async findById(id: string): Promise<Result | undefined> {
    const result = this.results.find(item => item.id === id);

    return result;
  }

  public async findByResearchId(research_id: string): Promise<Result[]> {
    const result = this.results.filter(
      item => item.research_id === research_id
    );

    return result;
  }
}

export default FakeResultsRepository;
