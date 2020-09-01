// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IResearcherProvider from '../providers/ResearcherProvider/models/IResearcherProvider';
import IResultDTO from '../dtos/IResultDTO';

interface IRequest {
  product_description: string;
  pages: number;
  min_price?: number;
  max_price?: number;
}

@injectable()
class SearchForProductsService {
  constructor(
    @inject('ResearcherProvider')
    private researcherProvider: IResearcherProvider
  ) {}

  public async execute({
    product_description,
    pages,
    min_price,
    max_price,
  }: IRequest): Promise<IResultDTO[]> {
    const results = await this.researcherProvider.findProduct({
      product_description,
      pages,
      min_price,
      max_price,
    });

    return results;
  }
}

export default SearchForProductsService;
