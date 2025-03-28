import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { getListCount } from '@/utils/getListCount';
import { Badge } from '@/components/ui/badge';
import { useNotificationsStore } from '@/store/notificationsStore';
import { formatDistanceToNow } from 'date-fns';
import { notificationsStyle } from '@/utils/notificationsUtils';
import { Clock } from 'lucide-react';

export const Dashboard = () => {
  const { lists } = useListStore();
  const { tasks } = useTaskStore();
  const { notifications } = useNotificationsStore();
  const [totalCompleted, setTotalCompleted] = useState(0);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!data) setTotalCompleted(0);
    let stats = data.last7DaysStats;
    if (e.currentTarget.textContent !== 'Week') stats = data.lastMonthStats;
    setTotalCompleted(stats.reduce((acc, c) => acc + c.tasks, 0));
  };

  const data = useMemo(() => getListCount(lists), [lists, tasks]);

  useEffect(() => {
    setTotalCompleted(data.last7DaysStats.reduce((acc, c) => acc + c.tasks, 0));
  }, [data]);

  console.log(notifications);

  if (!data) return <div></div>;

  return (
    <div className='py-8 pt-20 lg:pl-[360px] lg:pr-3 px-2'>
      <h1 className='text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-50'>
        Dashboard
      </h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='bg-gray-100 dark:bg-neutral-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-neutral-700 dark:text-neutral-50'>
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-50'>
              {data.total}
            </div>
          </CardContent>
        </Card>
        <Card className='bg-gray-100 dark:bg-neutral-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-50'>
              <span>Completed Tasks</span>
              <Badge
                text={`${data.completedPercentage}%`}
                className='bg-green-500/10 text-green-500'
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-500'>
              {data.completed}
            </div>
          </CardContent>
        </Card>
        <Card className='bg-gray-100 dark:bg-neutral-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-50'>
              <span>Pending Tasks</span>
              <Badge
                text={`${data.pendingPercentage}%`}
                className='bg-yellow-500/10 text-yellow-500'
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-yellow-500'>
              {data.pending}
            </div>
          </CardContent>
        </Card>
        <Card className='bg-gray-100 dark:bg-neutral-900'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-50'>
              <span>Overdue Tasks</span>
              <Badge
                text={`${data.overduePercentage}%`}
                className='bg-red-500/10 text-red-500'
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-500'>
              {data.overdue}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 mt-4'>
        <Card className='bg-gray-100 dark:bg-neutral-900'>
          <Tabs defaultValue='week'>
            <CardHeader className='h-16 flex flex-row items-center'>
              <CardTitle className='w-full text-neutral-800 flex justify-between items-center dark:text-neutral-50'>
                <span className='flex items-center gap-x-2.5 dark:text-neutral-50'>
                  <span className='hidden sm:inline-block'>
                    Completed Tasks
                  </span>
                  <TabsList className='self-start'>
                    <TabsTrigger value='week' onClick={handleTabClick}>
                      <span>Week</span>
                    </TabsTrigger>
                    <TabsTrigger value='month' onClick={handleTabClick}>
                      Month
                    </TabsTrigger>
                  </TabsList>
                </span>
                <Badge
                  text={totalCompleted.toString()}
                  className={`w-7 py-1 text-sm bg-neutral-500/10 self-center text-center
                    ${
                      totalCompleted === 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TabsContent value='week'>
                <ResponsiveContainer className='-mx-10 !w-[calc(100%+2.75rem)] !h-[300px] xl:!h-[350px]'>
                  <BarChart data={data.last7DaysStats}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='stroke-muted'
                    />
                    <XAxis dataKey='name' className='text-muted-foreground' />
                    <YAxis className='text-muted-foreground' />
                    <Tooltip
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border))',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        padding: '6px 10px',
                      }}
                      labelStyle={{
                        color: 'hsl(var(--foreground))',
                        fontWeight: 600,
                        marginBottom: '4px',
                      }}
                      itemStyle={{
                        color: 'hsl(var(--muted-foreground))',
                        fontSize: '0.875rem',
                      }}
                      formatter={(value: number) => [`${value} tasks`, 'Tasks']}
                      labelFormatter={(label: string) => `${label}'s Tasks`}
                    />
                    <Bar dataKey='tasks' className='fill-primary' />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value='month'>
                <ResponsiveContainer className='-mx-10 !w-[calc(100%+2.75rem)] !h-[300px] xl:!h-[350px]'>
                  <BarChart data={data.lastMonthStats}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='stroke-muted'
                    />
                    <XAxis dataKey='name' className='text-muted-foreground' />
                    <YAxis className='text-muted-foreground' />
                    <Tooltip
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border))',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        padding: '6px 10px',
                      }}
                      labelStyle={{
                        color: 'hsl(var(--foreground))',
                        fontWeight: 600,
                        marginBottom: '4px',
                      }}
                      itemStyle={{
                        color: 'hsl(var(--muted-foreground))',
                        fontSize: '0.875rem',
                      }}
                      formatter={(value: number) => [`${value} tasks`, 'Tasks']}
                      labelFormatter={(label: string) => `${label}'s Tasks`}
                    />
                    <Bar dataKey='tasks' className='fill-primary' />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <Card className='bg-gray-100 dark:bg-neutral-900'>
          <CardHeader>
            <CardTitle className='text-neutral-800 dark:text-neutral-50'>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mt-0 overflow-y-auto !h-[300px] xl:!h-[350px]'>
              {notifications?.length === 0 && (
                <div className='flex items-center justify-center h-full'>
                  No recent activity.
                </div>
              )}
              <ul className='space-y-2'>
                {notifications?.map((notification, index) => (
                  <li
                    key={index}
                    className='flex items-start p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900'
                  >
                    <div className='w-full'>
                      <div className='flex items-center justify-between'>
                        <p className='text-card-foreground font-medium text-sm'>
                          {notification.message}
                        </p>
                        <Badge
                          text={notification.action + ' ' + notification.type}
                          className={`ml-2 ${notificationsStyle(
                            notification.action
                          )}`}
                        />
                      </div>
                      <div className='flex items-center mt-1 gap-1.5 text-xs text-zinc-400'>
                        <Clock className='h-3 w-3' />
                        <span>
                          {formatDistanceToNow(
                            new Date(notification.timestamp),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
