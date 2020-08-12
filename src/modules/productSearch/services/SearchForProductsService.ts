// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IResearcherProvider from '../providers/ResearcherProvider/models/IResearcherProvider';

interface IRequest {
  product_description: string;
  pages: number;
}

// interface IResponse {}

@injectable()
class SearchForProductsService {
  constructor(
    @inject('ResearcherProvider')
    private researcherProvider: IResearcherProvider
  ) {}

  public async execute({
    product_description,
    pages,
  }: IRequest): Promise<void> {
    const results = await this.researcherProvider.findProduct({
      product_description,
      pages,
    });

    console.log(results);
  }
}

export default SearchForProductsService;
