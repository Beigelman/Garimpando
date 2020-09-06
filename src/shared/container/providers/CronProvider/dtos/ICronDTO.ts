export default interface ICronDTO {
  schedule: string;
  action: VoidFunction;
}
