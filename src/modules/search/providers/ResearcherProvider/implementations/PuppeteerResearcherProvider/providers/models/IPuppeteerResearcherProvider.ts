import IResultDTO from '@modules/search/dtos/IResultDTO';
import IPuppeteerParamsDTO from '@modules/search/dtos/IPuppeteerParamsDTO';

export default interface IPuppeteerResearcherProvider {
  findTags(params: IPuppeteerParamsDTO): Promise<IResultDTO[]>;
  provider: string;
}
