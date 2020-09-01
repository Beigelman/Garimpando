import ISearchParamsDTO from '@modules/search/dtos/ISearchParamsDTO';
import IResultDTO from '@modules/search/dtos/IResultDTO';

export default interface IResearcherProvider {
  findProduct(params: ISearchParamsDTO): Promise<IResultDTO[]>;
}
