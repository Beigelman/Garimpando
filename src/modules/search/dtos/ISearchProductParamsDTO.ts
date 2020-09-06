interface IProductsPlatforms {
  olx: boolean;
  ml: boolean;
}

export default interface ISearchProductParamsDTO {
  product_description: string;
  platform: IProductsPlatforms;
  pages: number;
  min_price?: number;
  max_price?: number;
}
