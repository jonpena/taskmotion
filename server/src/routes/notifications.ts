import { supabaseMiddleware } from '@server/middleware/supabase';
import {
  createNotification,
  getNotifications,
  updateNotifications,
} from '@server/services/notifications';
import { Notification } from '@shared/interfaces/notification.interface';
import { deduplicateNotifications } from '@shared/utils/deduplicateNotifications';
import { MAX_NOTIFICATIONS } from '@shared/constants/base';
import { Hono } from 'hono';

export const notificationsApp = new Hono();

notificationsApp.use('*', supabaseMiddleware);

// Get notifications
notificationsApp.get('/:email', async (c) => {
  const email = c.req.param('email');
  const { data, error } = await getNotifications(c, email);

  if (error) return c.json({ error }, 400);

  if (data && data.length > 0) {
    const notifications = data[0].notifications as Notification[];

    return c.json({ data: notifications }, 200);
  }
  return c.json({ data }, 200);
});

// Update notifications
notificationsApp.put('/:email', async (c) => {
  const email = c.req.param('email');
  const body: Notification = await c.req.json();

  // First check if notifications exist for this email
  const { data: existingData, error: existingError } = await getNotifications(
    c,
    email
  );

  if (existingError) return c.json({ error: existingError }, 400);

  let result: any;

  // If notifications exist, append the new one
  if (existingData.length > 0) {
    // Assuming notifications is an array in the existing record
    const existingNotifications: Notification[] =
      existingData[0].notifications || [];
    const notifications = [body, ...existingNotifications];
    const removeNotifications = deduplicateNotifications(notifications);
    const temp = removeNotifications.slice(0, MAX_NOTIFICATIONS);
    // Update the existing notifications
    result = await updateNotifications(c, email, temp);
  } else {
    // If no notifications exist, create a new record
    result = await createNotification(c, email, body);
  }

  const { data, error } = result;
  if (error) return c.json({ error }, 400);

  return c.json({ data }, 200);
});
