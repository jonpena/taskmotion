import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { userApp } from './routes/users';
import { listApp } from './routes/lists';

const app = new Hono().basePath('/api');

// Configurar CORS para permitir solo el localhost:3000
//y taskmotion.pages.dev puedan acceder a la API
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'https://taskmotion.pages.dev'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.route('/lists', listApp);

app.route('/users', userApp);

export default app;
