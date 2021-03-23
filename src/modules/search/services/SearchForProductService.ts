// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import path from 'path';
import IResearcherProvider from '../providers/ResearcherProvider/models/IResearcherProvider';
import IResultDTO from '../dtos/IResultDTO';
import ISearchProductDTO from '../dtos/ISearchProductDTO';
import ISearchProductParamsDTO from '../dtos/ISearchProductParamsDTO';
import IResultsRepository from '../repositories/IResultsRepository';
import IResearchesRepository from '../repositories/IResearchesRepository';

@injectable()
class SearchForProductService {
  constructor(
    @inject('ResearcherProvider')
    private researcherProvider: IResearcherProvider,
    @inject('ResearchesRepository')
    private researchesRepository: IResearchesRepository,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository,
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('QueueProvider')
    private queueProvider: IQueueProvider
  ) {}

  public async execute({
    research_id,
  }: ISearchProductDTO): Promise<IResultDTO[]> {
    const research = await this.researchesRepository.findById(research_id);

    if (!research) {
      throw new AppError('Research not found');
    }

    const user = await this.userRepository.findById(research.user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const params = JSON.parse(research.params) as ISearchProductParamsDTO;

    const results_found = await this.researcherProvider.findProduct({
      ...params,
    });

    const old_results = await this.resultsRepository.findByResearchId(
      research_id
    );

    const new_results = results_found.filter(item =>
      old_results?.every(
        result =>
          result.title !== item.title &&
          Number(result.price) !== Number(item.price)
      )
    );

    if (new_results.length === 0) {
      throw new AppError('No new Results were found');
    }

    await this.resultsRepository.create({
      research_id,
      results: new_results,
    });

    this.queueProvider.add({
      name: 'SendNotificationEmail',
      data: {
        from: { name: 'Garimpando', email: 'garimpando@gmail.com' },
        subject: `Novos achados para "${params.product_description}"`,
        templateData: {
          file: path.resolve(__dirname, '..', 'views', 'new_products.hbs'),
          variables: {
            name: user.name,
            research: params.product_description,
            results: new_results,
          },
        },
        to: { name: user.name, email: user.email },
      },
    });

    return new_results;
  }
}

export default SearchForProductService;
