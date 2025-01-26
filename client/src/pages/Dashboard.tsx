import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
// import { Bell, CheckCircle2, AlertCircle } from 'lucide-react';
// import { DashboardAnalytics } from '@/interfaces/dashboardAnalytics.interface';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { getListCount } from '@/utils/getListCount';
import { Badge } from '@/components/ui/badge';

// Simulated data - replace this with actual data fetching logic
// const fetchTodoData = () => {
//   return {
//     notifications: [
//       // {
//       //   id: 1,
//       //   type: 'created',
//       //   message: 'New task "Prepare presentation" created',
//       //   timestamp: '2 hours ago',
//       // },
//       // {
//       //   id: 2,
//       //   type: 'completed',
//       //   message: 'Task "Send email to client" completed',
//       //   timestamp: '4 hours ago',
//       // },
//       // {
//       //   id: 3,
//       //   type: 'overdue',
//       //   message: 'Task "Submit report" is overdue',
//       //   timestamp: '1 day ago',
//       // },
//     ],
//   };
// };

export const Dashboard = () => {
  const { lists } = useListStore();
  const { tasks } = useTaskStore();

  const data = useMemo(() => getListCount(lists), [lists, tasks]);

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
          <CardHeader>
            <CardTitle className='text-neutral-800 dark:text-neutral-50'>
              Tasks Completed last week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='107%' height={350} className='-mx-12'>
              <BarChart data={data.last7DaysStats}>
                <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
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
                  labelFormatter={(label) => `${label}'s Tasks`}
                />
                <Bar dataKey='tasks' className='fill-primary' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className='bg-gray-100 dark:bg-neutral-900'>
          <CardHeader>
            <CardTitle className='text-neutral-800 dark:text-neutral-50'>
              Notifications Soon 🚧
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mt-6'>
              {/* <h3 className='text-lg font-semibold mb-2'>Recent Activity</h3> */}
              {/* <ul className='space-y-2'>
                {data.notifications?.map((notification) => (
                  <li
                    key={notification.id}
                    className='flex items-start space-x-2 text-sm'
                  >
                    {notification.type === 'created' && (
                      <Bell className='h-5 w-5 text-primary' />
                    )}
                    {notification.type === 'completed' && (
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                    )}
                    {notification.type === 'overdue' && (
                      <AlertCircle className='h-5 w-5 text-destructive' />
                    )}
                    <div>
                      <p className='text-card-foreground'>
                        {notification.message}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {notification.timestamp}
                      </p>
                    </div>
                  </li>
                ))}
              </ul> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
