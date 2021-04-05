import { getRepository, Repository } from 'typeorm';
import IResearchesRepository from '@modules/search/repositories/IResearchesRepository';
import ICreateResearchDTO from '@modules/search/dtos/ICreateResearchDTO';
import Research from '../entities/Research';

class ResearchesRepository implements IResearchesRepository {
  private ormRepository: Repository<Research>;

  constructor() {
    this.ormRepository = getRepository(Research);
  }

  public async create({
    user_id,
    params,
    frequency,
  }: ICreateResearchDTO): Promise<Research> {
    const research = this.ormRepository.create({
      user_id,
      params,
      frequency,
      deleted_at: null,
    });

    await this.ormRepository.save(research);

    return research;
  }

  public async save(research: Research): Promise<Research> {
    return this.ormRepository.save(research);
  }

  public async findAll(): Promise<Research[] | undefined> {
    const researches = await this.ormRepository.find({
      where: { deleted_at: null },
    });

    return researches;
  }

  public async findById(id: string): Promise<Research | undefined> {
    const research = await this.ormRepository.findOne(id);

    return research;
  }

  public async findByParams(params: string): Promise<Research | undefined> {
    const research = await this.ormRepository.findOne({
      where: { params },
    });

    return research;
  }

  public async findByUserId(user_id: string): Promise<Research[]> {
    const researches = await this.ormRepository.find({
      where: { user_id },
    });

    return researches;
  }
}

export default ResearchesRepository;
