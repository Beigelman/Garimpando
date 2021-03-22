import { IQueueProvider } from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
class Queue {
  constructor(@inject('QueueProvider') private queue: IQueueProvider) {}

  processQueues(): void {
    this.queue.process();
  }
}

export default Queue;
