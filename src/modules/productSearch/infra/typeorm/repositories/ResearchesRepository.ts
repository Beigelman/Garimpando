import { getRepository, Repository } from 'typeorm';
import IResearchesRepository from '@modules/productSearch/repositories/IResearchesRepository';
import ICreateResearchDTO from '@modules/productSearch/dtos/ICreateResearchDTO';
import Research from '../entities/Research';

class ResearchesRepository implements IResearchesRepository {
  private ormRepository: Repository<Research>;

  constructor() {
    this.ormRepository = getRepository(Research);
  }

  public async create({
    user_id,
    platform_id,
    params,
    frequency,
  }: ICreateResearchDTO): Promise<Research> {
    const research = this.ormRepository.create({
      user_id,
      platform_id,
      params,
      frequency,
    });

    await this.ormRepository.save(research);

    return research;
  }

  public async findById(id: string): Promise<Research | undefined> {
    const researches = await this.ormRepository.findOne(id);

    return researches;
  }

  public async findByUserId(user_id: string): Promise<Research[] | undefined> {
    const researches = await this.ormRepository.find({
      where: { user_id },
    });

    return researches;
  }
}

export default ResearchesRepository;
