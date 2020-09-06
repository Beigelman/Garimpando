interface IResultDTO {
  title: string;
  price: number;
  link: string;
}
export default interface ICreateResultDTO {
  research_id: string;
  results: IResultDTO[];
}
