import ICronDTO from '../dtos/ICronDTO';
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
