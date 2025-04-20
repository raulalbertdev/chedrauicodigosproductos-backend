// queues/emailQueue.js
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(); // usa localhost:6379 por defecto

export const emailQueue = new Queue('correo', {
  connection,
});