import ICreateResearchDTO from '../dtos/ICreateResearchDTO';
import Research from '../infra/typeorm/entities/Research';

export default interface IResearchesRepository {
  create(data: ICreateResearchDTO): Promise<Research>;
  save(data: Research): Promise<Research>;
  findAll(): Promise<Research[] | undefined>;
  findById(id: string): Promise<Research | undefined>;
  findByParams(params: string): Promise<Research | undefined>;
  findByUserId(user_id: string): Promise<Research[]>;
}
