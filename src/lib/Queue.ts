import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import { inject, injectable } from 'tsyringe';

interface IQueue {
  processQueues(): void;
}
@injectable()
class Queue implements IQueue {
  constructor(@inject('QueueProvider') private queue: IQueueProvider) {}

  public processQueues(): void {
    this.queue.process();
  }
}

export default Queue;
