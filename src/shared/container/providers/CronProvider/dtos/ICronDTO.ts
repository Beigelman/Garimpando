export default interface ICronDTO {
  schedule: string;
  action(): void;
}
