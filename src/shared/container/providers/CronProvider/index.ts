import { container } from 'tsyringe';
import NodeCronProvider from './implementations/NodeCronProvider';
import ICronProvider from './models/ICronProvider';

container.registerSingleton<ICronProvider>('CronProvider', NodeCronProvider);
