import { userLists } from '@/services/listService';
import { getLocalStorageByRegex } from '@/utils/getLocalStorageByRegex';
import useSWR from 'swr';

export const useLists = () => {
  const authToken = getLocalStorageByRegex(/auth-token/i);
  const parseAuth = JSON.parse(authToken as string);

  const { data, error, isLoading, mutate } = useSWR(
    parseAuth ? [parseAuth.access_token] : null,
    () => userLists(parseAuth.access_token)
  );

  const refreshLists = async () => await mutate();

  return { data, isLoading, error, refreshLists };
};
