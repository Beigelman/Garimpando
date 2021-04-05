import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Research from '../infra/typeorm/entities/Research';
import IResearchesRepository from '../repositories/IResearchesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class FindUserResearchesService {
  constructor(
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Research[]> {
    const researches = await this.researchesRepository.findByUserId(user_id);

    if (researches?.length === 0) {
      throw new AppError('No researches were found');
    }

    return researches;
  }
}

export default FindUserResearchesService;
