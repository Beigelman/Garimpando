import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Research from '../infra/typeorm/entities/Research';
import IResearchesRepository from '../repositories/IResearchesRepository';

interface IRequest {
  user_id: string;
  research_id: string;
}

@injectable()
class CancelResearchesServices {
  constructor(
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository
  ) {}

  public async execute({ user_id, research_id }: IRequest): Promise<Research> {
    const research = await this.researchesRepository.findById(research_id);

    if (!research) {
      throw new AppError('Research not found');
    }

    if (research.user_id !== user_id) {
      throw new AppError('You can only delete your on research');
    }

    const canceled_research = { ...research, deleted_at: new Date() };

    await this.researchesRepository.save(canceled_research);

    return canceled_research;
  }
}

export default CancelResearchesServices;
