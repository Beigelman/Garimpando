import Results from '@modules/search/infra/typeorm/entities/Result';
import ICreateResultDTO from '../dtos/ICreateResultDTO';

export default interface IResultsRepository {
  create(data: ICreateResultDTO): Promise<Results[]>;
  findById(id: string): Promise<Results | undefined>;
  findByResearchId(research_id: string): Promise<Results[] | undefined>;
}
