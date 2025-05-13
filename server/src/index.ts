import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { userApp } from './routes/users';
import { listApp } from './routes/lists';
import { aiApp } from './routes/ai';
import { notificationsApp } from './routes/notifications';

const app = new Hono().basePath('/api');

app.use(
  '*',
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://taskmotion.pages.dev',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.route('/lists', listApp);
app.route('/users', userApp);
app.route('/ai', aiApp);
app.route('/notifications', notificationsApp);

export default app;
