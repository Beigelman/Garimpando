import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';

import '@shared/infra/typeorm';

import { container } from 'tsyringe';
import throng from 'throng';
import Queue from '../lib/Queue';

const queue = container.resolve(Queue);

function start(): void {
  queue.processQueues();
}

throng({ workers: 2, start });
