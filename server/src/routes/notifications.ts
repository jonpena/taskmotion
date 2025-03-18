import { supabaseMiddleware } from '@server/middleware/supabase';
import {
  createNotification,
  getNotifications,
  updateNotifications,
} from '@server/services/notifications';
import { INotification } from '@shared/notification.interface';
import { Hono } from 'hono';

export const notificationsApp = new Hono();

notificationsApp.use('*', supabaseMiddleware);

notificationsApp.get('/:email', async (c) => {
  const email = c.req.param('email');
  const { data, error } = await getNotifications(c, email);

  if (error) return c.json({ error }, 400);

  if (data && data.length > 0) {
    const notifications = data[0].notifications as INotification[];
    return c.json({ data: notifications.splice(0, 30) }, 200);
  }
  return c.json({ data }, 200);
});

notificationsApp.put('/:email', async (c) => {
  const email = c.req.param('email');
  const body = (await c.req.json()) as INotification;

  // First check if notifications exist for this email
  const { data: existingData, error: fetchError } = await getNotifications(
    c,
    email
  );

  if (fetchError) return c.json({ error: fetchError }, 400);

  let result;

  // If notifications exist, append the new one
  if (existingData && existingData.length > 0) {
    // Assuming notifications is an array in the existing record
    const existingNotifications = existingData[0].notifications || [];
    const updatedNotifications = [body, ...existingNotifications];
    // Update the existing notifications
    result = await updateNotifications(c, email, updatedNotifications);
  } else {
    // If no notifications exist, create a new record
    result = await createNotification(c, email, body);
  }

  const { data, error } = result;
  if (error) return c.json({ error }, 400);

  return c.json({ data }, 200);
});
