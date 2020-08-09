import IResearchesRepository from '@modules/productSearch/repositories/IResearchesRepository';
import ICreateResearchDTO from '@modules/productSearch/dtos/ICreateResearchDTO';
import Research from '@modules/productSearch/infra/typeorm/entities/Research';
import { uuid } from 'uuidv4';

class ResearchesRepository implements IResearchesRepository {
  private researches: Research[] = [];

  public async create(researchData: ICreateResearchDTO): Promise<Research> {
    const research = new Research();

    Object.assign(research, { id: uuid() }, researchData);

    this.researches.push(research);

    return research;
  }

  public async findById(id: string): Promise<Research | undefined> {
    const research = this.researches.find(item => item.id === id);

    return research;
  }

  public async findByUserId(user_id: string): Promise<Research[] | undefined> {
    const research = this.researches.filter(item => item.user_id === user_id);

    return research;
  }
}

export default ResearchesRepository;
