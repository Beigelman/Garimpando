import IResearchParamsDTO from '@modules/productSearch/dtos/IResearchParamsDTO';

export default interface IResearcherProvider {
  findProduct(params: IResearchParamsDTO): Promise<void>;
}
