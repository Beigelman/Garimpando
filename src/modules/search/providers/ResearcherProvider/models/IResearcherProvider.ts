import ISearchProductParamsDTO from '@modules/search/dtos/ISearchProductParamsDTO';
import IResultDTO from '@modules/search/dtos/IResultDTO';

export default interface IResearcherProvider {
  findProduct(params: ISearchProductParamsDTO): Promise<IResultDTO[]>;
}
