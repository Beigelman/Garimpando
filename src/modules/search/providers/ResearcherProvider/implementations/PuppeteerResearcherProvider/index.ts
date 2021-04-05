/* eslint-disable @typescript-eslint/no-explicit-any */
import ISearchProductParamsDTO from '@modules/search/dtos/ISearchProductParamsDTO';
import IResultDTO from '@modules/search/dtos/IResultDTO';
import OlxProvider from './providers/implementations/OlxProvider';
import IPuppeteerResearcherProvider from './providers/models/IPuppeteerResearcherProvider';
import MercadoLivreProvider from './providers/implementations/MercadoLivreProvider';
import IResearcherProvider from '../../models/IResearcherProvider';

export default class PuppeteerResearcherProvider
  implements IResearcherProvider {
  private olxProvider: IPuppeteerResearcherProvider;

  private mlProvider: IPuppeteerResearcherProvider;

  constructor() {
    this.olxProvider = new OlxProvider();
    this.mlProvider = new MercadoLivreProvider();
  }

  public async findProduct({
    product_description,
    pages,
    platform,
    min_price,
    max_price,
  }: ISearchProductParamsDTO): Promise<IResultDTO[]> {
    const providers = [this.olxProvider, this.mlProvider].filter(p =>
      Object.keys(platform).some(key => key === p.provider)
    );

    const search = providers.map(p =>
      p.findTags({
        product_description,
        pages,
      })
    );

    const results = await Promise.all(search);

    const allResults = results
      .flat(1)
      .filter(item => item.link && item.price && item.title)
      .map(item => ({ ...item, title: item.title.toLocaleLowerCase() }));

    const filteredResults = allResults.filter(item => {
      if (min_price && !max_price) {
        return item.price > min_price;
      }
      if (!min_price && max_price) {
        return item.price < max_price;
      }
      if (min_price && max_price) {
        return item.price < max_price && item.price > min_price;
      }
      return item;
    });

    return filteredResults;
  }
}
