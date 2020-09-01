import ICreateResultDTO from '@modules/search/dtos/ICreateResultDTO';
import Result from '@modules/search/infra/typeorm/entities/Result';
import { uuid } from 'uuidv4';
import IResultsRepository from '../IResultsRepository';

class ResultsRepository implements IResultsRepository {
  private results: Result[] = [];

  public async create(resultData: ICreateResultDTO): Promise<Result> {
    const result = new Result();

    Object.assign(result, { id: uuid() }, resultData);

    this.results.push(result);

    return result;
  }

  public async findById(id: string): Promise<Result | undefined> {
    const result = this.results.find(item => item.id === id);

    return result;
  }

  public async findByUserId(user_id: string): Promise<Result[] | undefined> {
    const result = this.results.filter(item => item.research_id === user_id);

    return result;
  }
}

export default ResultsRepository;
