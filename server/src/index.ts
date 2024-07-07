import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { userApp } from './routes/users';
import { listApp } from './routes/lists';

const app = new Hono().basePath('/api');

// Configurar CORS para permitir cualquier origen
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.route('/lists', listApp);

app.route('/users', userApp);

export default app;
