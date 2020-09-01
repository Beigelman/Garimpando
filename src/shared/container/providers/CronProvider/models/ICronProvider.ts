import ICronDTO from '../dtos/ISendMailDTO';

export default interface ICronProvider {
  schedule(data: ICronDTO): void;
}
