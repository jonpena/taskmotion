import { Hono } from 'hono';
import { getSupabase, supabaseMiddleware } from '../middleware/supabase';
import { zListValidator } from '../validators/list.validator';
import { UserProps } from '../interfaces/user.interface';
import { zTaskValidator } from '../validators/task.validator';
import { ListProps } from '../interfaces/list.interface';

export const appList = new Hono();

appList.use('*', supabaseMiddleware);

appList.get('/', async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase.from('lists').select('*');
  return c.json({ data, error });
});

// GETTING A LIST FOR A USER USING EMAIL
appList.get('/:email', async (c) => {
  const supabase = getSupabase(c);

  const email = c.req.param('email');

  const users = await supabase
    .from('users')
    .select(`*`)
    .eq(`email`, `${email}`);

  const user = users.data?.[0] as UserProps;

  if (!user) {
    return c.json({ error: 'User does not exist' });
  }

  const lists = JSON.parse(user.lists.toString());

  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .in('listId', lists);

  return c.json({ data, error });
});

// CREATE A NEW LIST
appList.post('/:email', zListValidator, async (c) => {
  const body = (await c.req.json()) as ListProps;
  const email = c.req.param('email');

  const register = await getSupabase(c)
    .from('users')
    .select('*')
    .eq('email', email);

  if (register.data?.[0]) {
    const user = register.data[0] as UserProps;

    await getSupabase(c)
      .from('users')
      .update({
        lists: [...JSON.parse(user.lists.toString()), body.listId],
      })
      .eq('email', email);

    const { data, error } = await getSupabase(c)
      .from('lists')
      .insert(body)
      .select();

    return c.json({ data, error });
  }
});

// UPDATE A LIST
appList.put('/:listId', zTaskValidator, async (c) => {
  const listId = c.req.param('listId');
  const { tasks } = (await c.req.json()) as ListProps;

  const { data, error } = await getSupabase(c)
    .from('lists')
    .update({ tasks })
    .eq('listId', listId);

  return c.json({ data, error });
});

// DELETE A LIST
appList.delete('/:listId', async (c) => {
  const listId = c.req.param('listId');

  const { data: users, error: getUsersError } = await getSupabase(c)
    .from('users')
    .select('*')
    .filter('lists', 'like', `%${listId}%`);

  if (getUsersError) {
    return c.json({ error: getUsersError.message }, 400);
  }

  // Actualizar el array lists de cada usuario eliminando listId
  for (const user of users) {
    const lists = JSON.parse(user.lists.toString()) as string[];

    const newLists = lists.filter((id) => id !== listId);

    const { error: updateUserError } = await getSupabase(c)
      .from('users')
      .update({ lists: newLists })
      .eq('id', user.id);

    if (updateUserError) {
      return c.json({ error: updateUserError.message }, 400);
    }
  }

  const { data, error } = await getSupabase(c)
    .from('lists')
    .delete()
    .eq('listId', listId);

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  return c.json({ data });
});
