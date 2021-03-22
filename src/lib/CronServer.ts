import ICronProvider from '@shared/container/providers/CronProvider/models/ICronProvider';
import { container, inject, injectable } from 'tsyringe';
import SearchForAllProductsService from '@modules/search/services/SearchForAllProductsService';

interface ICronServer {
  start(): void;
}
@injectable()
class CronServer implements ICronServer {
  constructor(@inject('CronProvider') private cronProvider: ICronProvider) {}

  public start(): void {
    console.log('Cron running...');

    const searchForAllProducts = container.resolve(SearchForAllProductsService);

    this.cronProvider.schedule({
      schedule: '1 * * * * *',
      action: searchForAllProducts.execute,
    });
  }
}

export default CronServer;
