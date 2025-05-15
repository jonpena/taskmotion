import { getSupabase } from '@server/middleware/supabase';
import { Context } from 'hono';
import { BlankEnv, BlankInput } from 'hono/types';
import { INotification } from '@shared/interfaces/notification.interface';

type ctx = Context<BlankEnv, '/', BlankInput>;

export const getNotifications = async (c: ctx, email: string) => {
  return getSupabase(c)
    .from('notifications')
    .select(`*`)
    .eq(`email`, `${email}`);
};

export const createNotification = async (
  c: ctx,
  email: string,
  body: INotification
) => {
  return getSupabase(c)
    .from('notifications')
    .insert({
      email,
      notifications: [body],
    })
    .select();
};

export const updateNotifications = async (
  c: ctx,
  email: string,
  body: INotification[]
) => {
  return getSupabase(c)
    .from('notifications')
    .update({ notifications: body })
    .eq('email', email)
    .select();
};
