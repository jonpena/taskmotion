import { getSupabase } from '@/middleware/supabase';
import { Context } from 'hono';
import { BlankEnv, BlankInput } from 'hono/types';
import { Notification } from '@shared/types/notification.types';
import { NotificationRecord } from '@shared/types/notification-record.types';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

type ctx = Context<BlankEnv, '/', BlankInput>;

// GET ALL NOTIFICATIONS FOR A USER
export const getNotifications = async (c: ctx, email: string) => {
  return getSupabase(c).from('notifications').select('*').eq('email', email);
};

// CREATE A NEW NOTIFICATION
export const createNotification = async (
  c: ctx,
  email: string,
  body: Notification
): Promise<PostgrestSingleResponse<NotificationRecord[]>> => {
  return getSupabase(c)
    .from('notifications')
    .insert({
      email,
      notifications: [body],
    })
    .select();
};

// UPDATE NOTIFICATIONS FOR A USER
export const updateNotifications = async (
  c: ctx,
  email: string,
  body: Notification[]
): Promise<PostgrestSingleResponse<NotificationRecord[]>> => {
  return getSupabase(c)
    .from('notifications')
    .update({ notifications: body })
    .eq('email', email)
    .select();
};
