import IResultDTO from '@modules/productSearch/dtos/IResultDTO';
import IPuppeteerParamsDTO from '@modules/productSearch/dtos/IPuppeteerParamsDTO';

export default interface IPuppeteerResearcherProvider {
  findTags(params: IPuppeteerParamsDTO): Promise<IResultDTO[]>;
}
