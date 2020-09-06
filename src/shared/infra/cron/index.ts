import NodeCronProvider from '@shared/container/providers/CronProvider/implementations/NodeCronProvider';
import { container } from 'tsyringe';
import SearchForProductsRoutine from './routines/SearchForProductsRoutine';

interface ICronServer {
  start(): void;
}
export default class CronServer implements ICronServer {
  public start(): void {
    const cronProvider = container.resolve(NodeCronProvider);

    const searchForProductsRoutines = container.resolve(
      SearchForProductsRoutine
    );

    cronProvider.schedule({
      schedule: '1 * * * *',
      action: searchForProductsRoutines.execute,
    });
  }
}
