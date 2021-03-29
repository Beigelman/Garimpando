/* eslint-disable no-console */
// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Result from '../infra/typeorm/entities/Result';
import IResearchesRepository from '../repositories/IResearchesRepository';
import IResultsRepository from '../repositories/IResultsRepository';

interface IRequest {
  research_id: string;
  user_id: string;
}

@injectable()
class FindResultsService {
  constructor(
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository,
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute({ research_id, user_id }: IRequest): Promise<Result[]> {
    const research = await this.researchesRepository.findById(research_id);

    if (!research) {
      throw new AppError('Research not found');
    }

    const user = await this.userRepository.findById(research.user_id);

    if (user?.id !== user_id) {
      throw new AppError('You can only see your own researches');
    }

    const results = await this.resultsRepository.findByResearchId(research_id);

    return results;
  }
}

export default FindResultsService;
