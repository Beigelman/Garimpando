import ISearchParamsDTO from '@modules/productSearch/dtos/ISearchParamsDTO';
import IResultDTO from '@modules/productSearch/dtos/IResultDTO';

export default interface IResearcherProvider {
  findProduct(params: ISearchParamsDTO): Promise<IResultDTO[]>;
}
