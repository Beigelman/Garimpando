import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IResearchesRepository from '../repositories/IResearchesRepository';
import ISearchProductParamsDTO from '../dtos/ISearchProductParamsDTO';
import Research from '../infra/typeorm/entities/Research';

interface IRequest {
  user_id: string;
  params: ISearchProductParamsDTO;
  frequency: number;
}

@injectable()
class CreateRecurrentSearchService {
  constructor(
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository
  ) {}

  public async execute({
    user_id,
    params,
    frequency,
  }: IRequest): Promise<Research> {
    const researchRecorded = await this.researchesRepository.findByParams(
      JSON.stringify(params)
    );

    if (researchRecorded) {
      throw new AppError('Research already recorded in database');
    }

    const research = await this.researchesRepository.create({
      user_id,
      params: JSON.stringify(params),
      frequency,
    });

    return research;
  }
}

export default CreateRecurrentSearchService;
