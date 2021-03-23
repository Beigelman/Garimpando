import 'reflect-metadata';
import 'dotenv/config';

import '@shared/container';

import { container } from 'tsyringe';

import Queue from '../lib/Queue';

const queue = container.resolve(Queue);

queue.processQueues();
