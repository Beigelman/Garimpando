import ICronDTO from '../dtos/ICronDTO';

export default interface ICronProvider {
  schedule(data: ICronDTO): void;
}
