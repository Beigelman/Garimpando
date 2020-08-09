import IResultDTO from '@modules/productSearch/dtos/IResultDTO';

interface IParams {
  [key: string]: string;
}

export default interface IHashProvider {
  findProduct(params: IParams): Promise<IResultDTO[]>;
}
