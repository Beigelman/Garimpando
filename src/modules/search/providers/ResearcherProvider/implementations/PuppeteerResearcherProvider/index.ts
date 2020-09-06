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
    const [mlProducts, olxProducts] = await Promise.all([
      this.mlProvider.findTags({
        product_description,
        pages,
      }),
      this.olxProvider.findTags({
        product_description,
        pages,
      }),
    ]);

    const filteredProduct = await (async (): Promise<IResultDTO[]> => {
      let concatProducts: any[] = [];

      if (mlProducts && platform.ml) {
        const cleanMlProducts = mlProducts.map(item => ({
          title: item.title ? item.title.toLowerCase() : '',
          price: item.price ? item.price : 0,
          link: item?.link,
        }));

        let filteredMlProduct: any[] = [];

        if (min_price && !max_price) {
          filteredMlProduct = cleanMlProducts.filter(
            item => item.price > min_price
          );
        } else if (!min_price && max_price) {
          filteredMlProduct = cleanMlProducts.filter(
            item => item.price < max_price
          );
        } else if (min_price && max_price) {
          filteredMlProduct = cleanMlProducts.filter(
            item => item.price < max_price && item.price > min_price
          );
        } else {
          filteredMlProduct = cleanMlProducts;
        }

        concatProducts = concatProducts.concat(filteredMlProduct);
      }

      if (olxProducts && platform.olx) {
        const cleanOlxProducts = olxProducts.map(item => ({
          title: item.title ? item.title.toLowerCase() : '',
          price: item.price ? item.price : 0,
          link: item?.link,
        }));

        let filteredOlxProduct: any[] = [];

        if (min_price && !max_price) {
          filteredOlxProduct = cleanOlxProducts.filter(
            item => item.price > min_price
          );
        } else if (!min_price && max_price) {
          filteredOlxProduct = cleanOlxProducts.filter(
            item => item.price < max_price
          );
        } else if (min_price && max_price) {
          filteredOlxProduct = cleanOlxProducts.filter(
            item => item.price < max_price && item.price > min_price
          );
        } else {
          filteredOlxProduct = cleanOlxProducts;
        }

        concatProducts = concatProducts.concat(filteredOlxProduct);
      }

      return concatProducts;
    })();

    return filteredProduct;
  }
}
