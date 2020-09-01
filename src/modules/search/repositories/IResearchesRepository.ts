import ICreateResearchDTO from '../dtos/ICreateResearchDTO';
import Research from '../infra/typeorm/entities/Research';

export default interface IResearchesRepository {
  create(data: ICreateResearchDTO): Promise<Research>;
  findById(id: string): Promise<Research | undefined>;
  findByUserId(user_id: string): Promise<Research[] | undefined>;
}
