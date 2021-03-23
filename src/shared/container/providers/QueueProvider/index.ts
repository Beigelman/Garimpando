import { container } from 'tsyringe';
import IQueueProvider from './models/IQueueProvider';
import BullQueue from './implementations/BullQueue';

container.registerSingleton<IQueueProvider>('QueueProvider', BullQueue);
