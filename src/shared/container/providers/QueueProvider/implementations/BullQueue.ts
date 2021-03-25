import * as jobs from '@modules/search/jobs';
import Queue, { Job } from 'bull';
import redisConfig from '@config/redis';
import IQueueProvider, { IAdd } from '../models/IQueueProvider';

class BullQueue implements IQueueProvider {
  queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
  }));

  add({ data, name, options }: IAdd): Promise<Job<any>> | undefined {
    const queue = this.queues.find(q => q.name === name);

    return queue?.bull.add(data, options);
  }

  process(): void {
    console.log('Queues started!');
    return this.queues.forEach(q => {
      q.bull.process(q.handle);

      q.bull.on('failed', (job, err) => {
        console.log('Job failed', job.name, job.data);
        console.log('Error: ', err);
      });
    });
  }
}

export default BullQueue;
