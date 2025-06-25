import { UserNav } from '@/components/UserNav';
import { ListCollection } from '@/components/ListCollection';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <UserNav />
      <Outlet />
      <ListCollection />
    </>
  );
};
