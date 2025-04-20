// bullBoard.js o dentro de server.js
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bullmq';

import express from 'express';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queue');

const emailQueue = new Queue('correo', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
    enableReadyCheck: false
  }
});

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

export { serverAdapter };