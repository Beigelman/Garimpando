import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared/container';

import { container } from 'tsyringe';

import Queue from '../lib/Queue';
import CronServer from '../lib/CronServer';

const queue = container.resolve(Queue);
const cron = container.resolve(CronServer);

cron.start();

queue.processQueues();
