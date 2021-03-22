import IResearchesRepository from '@modules/search/repositories/IResearchesRepository';
import ICreateResearchDTO from '@modules/search/dtos/ICreateResearchDTO';
import Research from '@modules/search/infra/typeorm/entities/Research';
import { v4 as uuid } from 'uuid';

class FakeResearchesRepository implements IResearchesRepository {
  private researches: Research[] = [];

  public async create(researchData: ICreateResearchDTO): Promise<Research> {
    const research = new Research();

    Object.assign(research, { id: uuid() }, researchData);

    this.researches.push(research);

    return research;
  }

  public async findAll(): Promise<Research[] | undefined> {
    return this.researches;
  }

  public async findByParams(params: string): Promise<Research | undefined> {
    const research = this.researches.find(item => item.params === params);

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

export default FakeResearchesRepository;
