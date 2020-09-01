import ICronDTO from '../dtos/ISendMailDTO';
import ICronProvider from '../models/ICronProvider';

export default class FakeCronProvider implements ICronProvider {
  public async schedule({ schedule, action }: ICronDTO): Promise<void> {
    if (schedule) {
      setTimeout(() => {
        action();
      }, 1000);
    }
  }
}
