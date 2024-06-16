import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { userApp } from './routes/users';
import { listApp } from './routes/lists';

const app = new Hono().basePath('/api');

app.use(cors());

app.route('/users', userApp);

app.route('/lists', listApp);

export default app;
