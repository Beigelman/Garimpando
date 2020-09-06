// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IResearcherProvider from '../providers/ResearcherProvider/models/IResearcherProvider';
import IResultDTO from '../dtos/IResultDTO';
import ISearchProductParamsDTO from '../dtos/ISearchProductParamsDTO';

@injectable()
class SearchForProductsService {
  constructor(
    @inject('ResearcherProvider')
    private researcherProvider: IResearcherProvider
  ) {}

  public async execute({
    product_description,
    pages,
    platform,
    min_price,
    max_price,
  }: ISearchProductParamsDTO): Promise<IResultDTO[]> {
    const results = await this.researcherProvider.findProduct({
      product_description,
      platform,
      pages,
      min_price,
      max_price,
    });

    return results;
  }
}

export default SearchForProductsService;
