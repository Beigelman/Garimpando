/* eslint-disable no-console */
import * as jobs from '@modules/search/jobs';
import IQueueProvider, { IAdd } from '../models/IQueueProvider';
import FakeQueue from './FakeQueue';

class FakeQueueProvider implements IQueueProvider {
  queues = Object.values(jobs).map(job => ({
    bull: new FakeQueue(job.key, {}),
    name: job.key,
    handle: (): void => console.log(job.key),
  }));

  add({ name, data }: IAdd): void {
    const queue = this.queues.find(q => q.name === name);

    return queue?.bull.add(data);
  }

  process(): void {
    return this.queues.forEach(q => {
      q.bull.process(q.handle);
    });
  }
}

export default FakeQueueProvider;
