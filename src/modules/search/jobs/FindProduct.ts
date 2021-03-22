import { container } from 'tsyringe';
import SearchForProductService from '../services/SearchForProductService';

export default {
  key: 'FindProduct',
  async handle({ data }: any): Promise<void> {
    const searchForProduct = container.resolve(SearchForProductService);

    await searchForProduct.execute(data);
  },
};
