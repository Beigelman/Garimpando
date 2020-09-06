import cron from 'node-cron';
import ICronDTO from '../dtos/ICronDTO';
import ICronProvider from '../models/ICronProvider';

export default class NodeCronProvider implements ICronProvider {
  public schedule({ schedule, action }: ICronDTO): void {
    cron.schedule(schedule, action);
  }
}
