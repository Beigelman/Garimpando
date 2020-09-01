export default interface ICreateResearchDTO {
  user_id: string;
  params: string;
  frequency: number;
  deleted_at?: Date;
}
