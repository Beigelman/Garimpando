/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import IResearchParamsDTO from '@modules/productSearch/dtos/IResearchParamsDTO';

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
  }: IResearchParamsDTO): Promise<void> {
    const mlProducts = await this.mlProvider.findTags({
      product_description,
      pages,
    });

    const olxProducts = await this.olxProvider.findTags({
      product_description,
      pages,
    });

    console.log(olxProducts, mlProducts);
  }
}
